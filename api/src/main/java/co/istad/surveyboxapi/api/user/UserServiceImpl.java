package co.istad.surveyboxapi.api.user;

import co.istad.surveyboxapi.api.auth.AuthMapper;
import co.istad.surveyboxapi.api.auth.Role;
import co.istad.surveyboxapi.api.user.property.UserFilterSearch;
import co.istad.surveyboxapi.api.user.spec.UserFilter;
import co.istad.surveyboxapi.api.user.spec.UserSpec;
import co.istad.surveyboxapi.api.user.web.CreateUser;
import co.istad.surveyboxapi.api.user.web.GetUserDto;
import co.istad.surveyboxapi.api.user.web.UserDto;
import co.istad.surveyboxapi.util.PageUtils;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserMapStruct userMapStruct;
    private final UserMapper userMapper;
    private final AuthMapper authMapper;

    @Transactional
    @Override
    public CreateUser create(CreateUser accountProfileD) {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonData = objectMapper.valueToTree(accountProfileD.socialMedias());
        userMapper.insertUser(accountProfileD);
        return accountProfileD;
    }

    @Override
    public Page<User> findAllAccount(Map<String, String> params) {
        Pageable pageable = PageUtils.getPageable(params);

        UserFilter userFillter = new UserFilter();

        if (params.containsKey(UserFilterSearch.ID)) {
            userFillter.setUserId(params.get(UserFilterSearch.ID));
        }

        if (params.containsKey(UserFilterSearch.FIRST_NAME)) {
            userFillter.setFirstName(params.get(UserFilterSearch.FIRST_NAME));
        }

        if (params.containsKey(UserFilterSearch.LAST_NAME)) {
            userFillter.setLastName(params.get(UserFilterSearch.LAST_NAME));
        }

        if (params.containsKey(UserFilterSearch.FULL_NAME)) {
            userFillter.setFullName(params.get(UserFilterSearch.FULL_NAME));
        }

        UserSpec userSpec = new UserSpec(userFillter);

        Page<User> accountProfiles = userRepository.findAll(userSpec, pageable);

        return accountProfiles;
    }

    @Override
    public PageInfo<GetUserDto> findAllUser(int page, int limit) {
        return PageHelper.startPage(page, limit).doSelectPageInfo(userMapper::select);
    }

    @Override
    public UserDto getById(Long id) {
        User userId = userRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND
                , "user with %d not found"));
        return UserMapStruct.INSTANCE.toDto(userId);
    }

    @Override
    public void deleteById(Long id) {
        if (getById(id) != null) {
            userRepository.deleteById(id);
        }
    }

    @Override
    public UserDto updateById(Long id, UserDto accountProfile) {
        User existingAccountProfile = userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("User not found with ID: " + id)));
        existingAccountProfile.setLastName(accountProfile.lastName());
        existingAccountProfile.setFirstName(accountProfile.firstName());
        existingAccountProfile.setCompany(accountProfile.company());
        existingAccountProfile.setAddress(accountProfile.address());
        existingAccountProfile.setDob(accountProfile.dob());
        existingAccountProfile.setPosition(accountProfile.position());
        existingAccountProfile.setPhone(accountProfile.phone());
        User user = userRepository.save(existingAccountProfile);
        return userMapStruct.toDto(user);
    }

    @Override
    public boolean isValidUser(Long userId) {
        return userRepository.existsById(userId);
    }

    @Override
    public void UserUpdateStatus(Long id, Boolean flippedStatus) {
        User user =userMapper.findUserId(id).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND, "Survey not found."));
        // Update the survey status
        user.setActive(flippedStatus);

        // Save the updated survey
        userMapper.updateStatus(id,flippedStatus);

    }
}
