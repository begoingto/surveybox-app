package co.istad.surveyboxapi.api.question;

import co.istad.surveyboxapi.api.answerset.AnswerSet;
import co.istad.surveyboxapi.api.answerset.AnswerSetRepository;
import co.istad.surveyboxapi.api.answerset.web.AnswerSetDto;
import co.istad.surveyboxapi.api.auth.Role;
import co.istad.surveyboxapi.api.auth.web.AuthMeDto;
import co.istad.surveyboxapi.api.category.Category;
import co.istad.surveyboxapi.api.category.CategoryRepository;
import co.istad.surveyboxapi.api.question.filter.FilterCreator;
import co.istad.surveyboxapi.api.question.web.DataDisplayQuestionDto;
import co.istad.surveyboxapi.api.question.web.QuestionDto;
import co.istad.surveyboxapi.api.question.web.QuestionFilters;
import co.istad.surveyboxapi.api.user.User;
import co.istad.surveyboxapi.exception.ResourceNotFoundException;
import co.istad.surveyboxapi.security.currentuser.IAuthenticationFacade;
import co.istad.surveyboxapi.util.PageUtils;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class QuestionServiceImpl implements QuestionService {
    private final QuestionRepository questionRepository;
    private final CategoryRepository categoryRepository;
    private final QuestionMappStruct questionMappStruct;
    private final AnswerSetRepository answerSetRepository;
    private final IAuthenticationFacade iAuthenticationFacade;
    private final EntityManager entityManager;
    private final QuestionMapper questionMapper;

    public QuestionDto create(QuestionDto questionDto) {
        // Map the DTO to the entity
        Question question = questionMappStruct.toEntity(questionDto);
        setQuestionCreatedBy(question);

        // Set the question field in each AnswerSet entity
        for (AnswerSet answerSet : question.getAnswerSet()) {
            answerSet.setQuestions(question);
        }

        // Save the entity to the database
        question = questionRepository.save(question);

        // Map the entity back to the DTO
        return questionMappStruct.toDto(question);
    }

    private void setQuestionCreatedBy(Question question) {
        AuthMeDto authMeDto = iAuthenticationFacade.getAuthMeDto();
        User user = new User();
        user.setId(authMeDto.id());
        user.setFirstName(authMeDto.firstName());
        user.setLastName(authMeDto.lastName());
        user.setEmail(authMeDto.email());
        question.setUser(user);
    }

    @Override
    public DataDisplayQuestionDto displayQuestionContainById(Long id) {
        Question question = questionRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                String.format("Question with id %d not found", id)));
        Long categoryId = question.getCategory().getId();
        Category category = categoryRepository.findById(categoryId).orElse(null);
        question.setCategory(category);
        DataDisplayQuestionDto questionDto = new DataDisplayQuestionDto(question);
        return questionDto;
    }

    @Override
    public Question updateQuestion(QuestionDto questionDto, Long categoryId) {
        Category category = categoryRepository.findById(questionDto.getCategoryId()).orElseThrow(() ->
                new ResourceNotFoundException("Category", questionDto.getCategoryId()));
        Question question = questionRepository.findById(categoryId).orElseThrow(() ->
                new ResourceNotFoundException("Question", categoryId));
        question.setCategory(category);
        log.info("{}", category);
        questionMappStruct.updateQuestionFromDto(questionDto, question);
        return questionRepository.save(question);
    }

    @Override
    public Question getQuestionById(Long questionId) {
        // setQuestionCreatedBy(question.);
        AuthMeDto authMeDto = iAuthenticationFacade.getAuthMeDto();
        Question question = questionRepository.findById1(questionId)
                .orElseThrow(() -> new ResourceNotFoundException("Question", questionId));

        // Check if authenticated user is the same as the user who created the question
        if (!question.getUser().getId().equals(authMeDto.id())) {
            throw new ResourceNotFoundException("You are not authorized to access this question.", questionId);
        }

        return question;
    }

    @Override
    public Map<String, Object> deleteQuestion(Long questionId) {
        Question question = getQuestionById(questionId);
        setQuestionCreatedBy(question);
        questionRepository.delete(question);
        Map<String, Object> response = new HashMap<>();
        response.put("id", question.getId());
        response.put("name", question.getName());
        return response;
    }

    @Override
    public Page<Question> getQuestion(Map<String, String> params) {
        Pageable pageable = PageUtils.getPageable(params);

        if (params.containsKey("sortBy")) {
            String sortBy = params.get("sortBy");
            String sortDirection = params.getOrDefault("sortDirection", "asc");
            Sort sort = Sort.by(sortBy);
            if (sortDirection.equalsIgnoreCase("desc")) {
                sort = sort.descending();
            }
            pageable = PageUtils.getPageableWithSort(
                    params,
                    sort
            );
        }

        Specification<Question> spec = (root, query, cb) -> {
            List<Predicate> predicateList = new ArrayList<>();
            Join<Question, Category> categoryJoin = root.join("category");

            // Filter by category name
            if (params.containsKey("categoryName")) {
                String searchTerm = "%" + params.get("categoryName").toLowerCase() + "%";
                Predicate name = cb.like(cb.lower(categoryJoin.get("name")), searchTerm);
                predicateList.add(name);
            }

            // Filter by question name
            if (params.containsKey("questionName")) {
                String questionName = params.get("questionName").toLowerCase();
                Predicate predicate1 = cb.like(cb.lower(root.get("name")), "%" + questionName + "%");
                predicateList.add(predicate1);
            }

            // Filter by question type
            if (params.containsKey("questionType")) {
                String questionTypeStr = params.get("questionType");
                Predicate predicate1 = root.get("questionType").in(Collections.singleton(QuestionType.valueOf(questionTypeStr)));
                predicateList.add(predicate1);
            }

            // Filter by user ID
            if (params.containsKey("userId")) {
                Long userId = Long.valueOf(params.get("userId"));
                Predicate userIdPredicate = cb.equal(root.get("user").get("id"), userId);
                predicateList.add(userIdPredicate);
            }

            // Combine all the predicates using an AND operator
            Predicate[] predicates = predicateList.toArray(Predicate[]::new);
            return cb.and(predicates);
        };

        AuthMeDto authMeDto = iAuthenticationFacade.getAuthMeDto();
        var roles = authMeDto.roles().stream().map(Role::getName).toList();
        if (roles.contains("ADMIN")) {
            Page<Question> questions = questionRepository.findAll(spec, pageable);
            return questions;
        } else {
            Specification<Question> userSpec = (root, query, criteriaBuilder) ->
                    criteriaBuilder.equal(root.get("user").get("id"), authMeDto.id());
            Page<Question> questions = questionRepository.findAll(spec.and(userSpec), pageable);
            return questions;
        }
    }

    @Override
    @Transactional
    public QuestionDto update(Long id, QuestionDto questionDto) {

        Category category = categoryRepository.findById(questionDto.getCategoryId()).orElseThrow(() -> new ResourceNotFoundException("Category", questionDto.getCategoryId()));
        Question question = getQuestionById(id);
        question.setName(questionDto.getName());
        question.setCategory(category);
        question.setQuestionType(QuestionType.valueOf(questionDto.getQuestionType()));
        question.setAnswerTemplate(questionDto.getAnswerTemplate());
        question.setLayout(questionDto.getLayout());
        question.setRequired(questionDto.isRequired());

        // Update the AnswerSet entities
        if (questionDto.getAnswerSet() != null) {
            for (AnswerSetDto answerSetDto : questionDto.getAnswerSet()) {
                if (answerSetDto.getId() != null) {
                    // Update an existing AnswerSet entity
                    Optional<AnswerSet> answerSetOptional = answerSetRepository.findById(answerSetDto.getId());
                    if (answerSetOptional.isPresent()) {
                        AnswerSet answerSet = answerSetOptional.get();
                        answerSet.setName(answerSetDto.getName());
                        answerSet.setImg(answerSetDto.getImg());
                    }
                } else {
                    // Create a new AnswerSet entity
                    AnswerSet answerSet = new AnswerSet();
                    answerSet.setQuestions(question);
                    answerSet.setName(answerSetDto.getName());
                    answerSet.setImg(answerSetDto.getImg());
                    question.addAnswerSet(answerSet);
                }
            }
        }
        setQuestionCreatedBy(question);
        questionRepository.save(question);
        return questionMappStruct.toDto(question);

    }

    public Map<String, Object> countQuestions() {
        AuthMeDto authMeDto = iAuthenticationFacade.getAuthMeDto();
        User user = entityManager.find(User.class, authMeDto.id());
        Map<String, Object> counts = new HashMap<>();
        Map<String, Object> userMap = new HashMap<>();
        userMap.put("id", user.getId());
        userMap.put("first_name", user.getFirstName());
        userMap.put("last_name", user.getLastName());
        userMap.put("email", user.getEmail());
        counts.put("userCreator", userMap);
        var roles = authMeDto.roles().stream().map(Role::getName).toList();
        if (roles.contains("ADMIN")) {
            Long totalSurveys = entityManager.createQuery("SELECT COUNT(s) FROM Survey s", Long.class)
                    .getSingleResult();
            Long totalQuestions = entityManager.createQuery("SELECT COUNT(q) FROM Question q", Long.class)
                    .getSingleResult();
            Long totalVotes = entityManager.createQuery("SELECT COUNT(v) FROM Vote v", Long.class)
                    .getSingleResult();
            counts.put("totalVotes", totalVotes);
            counts.put("totalSurveys", totalSurveys);
            counts.put("totalQuestions", totalQuestions);
        } else {
            Long questionsCreatedByCurrentUser = entityManager.createQuery("SELECT COUNT(q) FROM Question q WHERE q.user.id = :userId", Long.class)
                    .setParameter("userId", user.getId())
                    .getSingleResult();
            Long totalSurveys = entityManager.createQuery("SELECT COUNT(s) FROM Survey s WHERE s.createdBy = :userId", Long.class)
                    .setParameter("userId", user.getId())
                    .getSingleResult();
            Long votesByCurrentUser = entityManager.createQuery("SELECT COUNT(v) FROM Vote v WHERE v.user.id = :userId", Long.class)
                    .setParameter("userId", user.getId())
                    .getSingleResult();
            counts.put("totalQuestions", questionsCreatedByCurrentUser);
            counts.put("totalSurveys", totalSurveys);
            counts.put("totalVotes", votesByCurrentUser);
        }
        return counts;
    }

    @Override
    public Page<Question> existingQuestion(Map<String, String> params) {
        // Get the authenticated user's information
        AuthMeDto authMeDto = iAuthenticationFacade.getAuthMeDto();

        // Create a Specification object based on the filter parameters
        Specification<Question> spec = (root, query, cb) -> {
            List<Predicate> predicateList = new ArrayList<>();
            Join<Question, Category> categoryJoin = root.join("category");

            // Filter by category name
            if (params.containsKey("categoryName")) {
                String searchTerm = "%" + params.get("categoryName").toLowerCase() + "%";
                Predicate name = cb.like(cb.lower(categoryJoin.get("name")), searchTerm);
                predicateList.add(name);
            }

            // Filter by question name
            if (params.containsKey("questionName")) {
                Predicate predicate1 = cb.like(root.get("name"), "%" + params.get("questionName") + "%");
                predicateList.add(predicate1);
            }

            // Filter by question type
            if (params.containsKey("questionType")) {
                String questionTypeStr = params.get("questionType");
                Predicate predicate1 = root.get("questionType").in(Collections.singleton(QuestionType.valueOf(questionTypeStr)));
                predicateList.add(predicate1);
            }

            // Combine all the predicates using an AND operator
            Predicate[] predicates = predicateList.toArray(Predicate[]::new);
            return cb.and(predicates);
        };

        // Check the user's role and add a createdBy predicate if the `createdBy` parameter is present
        if (params.containsKey("createdBy")) {
            String createdBy = params.get("createdBy").toUpperCase();
            FilterCreator filter = FilterCreator.valueOf(createdBy);

            Specification<Question> userSpec = (root, query, cb) -> {
                Join<Question, User> userJoin = root.join("user");
                Predicate createdByPredicate;
                var roles = authMeDto.roles().stream().map(Role::getName).toList();

                if (filter == FilterCreator.YOUR_SELF) {
                    createdByPredicate = cb.equal(userJoin.get("id"), authMeDto.id());
                } else if (filter == FilterCreator.ADMIN) {
                    if (roles.contains("ADMIN")) {
                        Predicate adminPredicate = cb.equal(userJoin.get("roles").get("name"), "ADMIN");
                        Predicate userIdPredicate = cb.equal(userJoin.get("id"), authMeDto.id());
                        createdByPredicate = cb.and(adminPredicate, userIdPredicate);
                    } else {
                        createdByPredicate = cb.equal(userJoin.get("roles").get("name"), "ADMIN");
                    }

                } else if (filter == FilterCreator.ALL) {
                    createdByPredicate = cb.or(
                            cb.equal(userJoin.get("id"), authMeDto.id()),
                            cb.equal(userJoin.get("roles").get("name"), "ADMIN")
                    );
                } else {
                    return null; // Skip this Predicate if the FilterCreator enum value is not recognized
                }
                return createdByPredicate;
            };
            spec = spec.and(userSpec);
        } else {
            // If the `createdBy` parameter is not present, filter the questions based on the current user
            Specification<Question> createdBySpec = (root, query, cb) -> {
                Join<Question, User> userJoin = root.join("user");
                Predicate createdByPredicate = cb.equal(userJoin.get("id"), authMeDto.id());
                Predicate createdByAdmin = cb.equal(root.get("user").get("roles").get("name"), "ADMIN");
                return cb.or(createdByPredicate, createdByAdmin);
            };
            spec = spec.and(createdBySpec);
        }

        // Add sorting criteria to the query
        if (params.containsKey("sortBy")) {
            String sortBy = params.get("sortBy");
            String sortDirection = params.getOrDefault("sortDirection", "asc");
            Sort sort = Sort.by(sortBy);
            if (sortDirection.equalsIgnoreCase("desc")) {
                sort = sort.descending();
            }
            Pageable pageable = PageUtils.getPageableWithSort(
                    params,
                    sort
            );
            // Execute the query and return the results as a Page
            Page<Question> questions = questionRepository.findAll(spec, pageable);
            return questions;
        } else {
            // If the `sortBy` parameter is not present, return the questions without sorting them
            Pageable pageable = PageUtils.getPageable(params);
            Page<Question> questions = questionRepository.findAll(spec, pageable);
            return questions;
        }
    }

    @Override
    public PageInfo<QuestionDto> findAll(int page, int limit, QuestionFilters filters) {
        AuthMeDto authMeDto = iAuthenticationFacade.getAuthMeDto();
        var roles = authMeDto.roles().stream().map(Role::getName).toList();

        PageInfo<Question> questionDtoPageInfo = PageHelper.startPage(page, limit).doSelectPageInfo(() -> {
            if (roles.contains("ADMIN")){
                questionMapper.findAll(filters);
            }else{
                QuestionFilters filtersSurveyCreator = QuestionFilters.builder()
                        .name(filters.name())
                        .questionType(filters.questionType())
                        .categoryId(filters.categoryId())
                        .createdBy(authMeDto.id())
                        .sortBy(filters.sortBy())
                        .sortDirection(filters.sortDirection())
                        .build();
                questionMapper.findAll(filtersSurveyCreator);
            }

        });
        return questionMappStruct.toDtoPageInfo(questionDtoPageInfo);
    }
}