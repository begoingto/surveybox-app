package co.istad.surveyboxapi.util;


import org.apache.commons.collections4.MapUtils;
import org.springframework.data.domain.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public interface PageUtils {
    int PAGE_SIZE_DEFAULT = 10;
    int PAGE_NUMBER_DEFAULT = 1;
    String PAGE_SIZE = "_limit";
    String PAGE_NUMBER = "_page";

    static Pageable getPageable(Map<String, String> params) {
        int pageSize = MapUtils.getInteger(params, PAGE_SIZE, PAGE_SIZE_DEFAULT);
        int pageNumber = MapUtils.getInteger(params, PAGE_NUMBER, PAGE_NUMBER_DEFAULT);
        if (pageNumber < 0) {
            pageNumber = PAGE_NUMBER_DEFAULT;
        }
        if (pageSize < 0) {
            pageSize = PAGE_SIZE_DEFAULT;
        }

        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);

        return pageable;
    }
static Pageable getPageableWithSort(Map<String, String> params, Sort sort) {
    int pageSize = MapUtils.getInteger(params, PAGE_SIZE, PAGE_SIZE_DEFAULT);
    int pageNumber = MapUtils.getInteger(params, PAGE_NUMBER, PAGE_NUMBER_DEFAULT);
    if (pageNumber < 0) {
        pageNumber = PAGE_NUMBER_DEFAULT;
    }
    if (pageSize < 0) {
        pageSize = PAGE_SIZE_DEFAULT;
    }

    Pageable pageable = PageRequest.of(pageNumber - 1, pageSize, sort);

    return pageable;
    }
    public static <T> Page<T> getPage(Map<String, Object> content, Map<String, String> params) {
        Pageable pageable = getPageable(params);
        int pageSize = pageable.getPageSize();
        int currentPage = pageable.getPageNumber();
        int startItem = currentPage * pageSize;
        List<T> list;

        if (content.size() < startItem) {
            list = Collections.emptyList();
        } else {
            List<Map.Entry<String, Object>> entryList = new ArrayList<>(content.entrySet());
            int toIndex = Math.min(startItem + pageSize, entryList.size());
            List<Map.Entry<String, Object>> sublist = entryList.subList(startItem, toIndex);
            list = sublist.stream().map(entry -> (T) entry.getValue()).collect(Collectors.toList());
        }

        return new PageImpl<>(list, pageable, content.size());
    }
}
