export const prepareSort = (loadOptions) => {
  let sorts = [];

  if (loadOptions.sort) {
    loadOptions.sort.forEach((sortDt) => {
      sorts.push({
        Desc: sortDt.desc ?? false,
        Selector: sortDt.selector,
      });
    });
  } else {
    sorts.push({
      Desc: false,
      Selector: "Id",
    });
  }
  return sorts;
};

export const prepareFilterBody = (loadOptions, extraData, keys) => {
  let paging = {
    skip: loadOptions.skip,
    take: loadOptions.take,
    sort: prepareSort(loadOptions, keys),
    filter: loadOptions.filter ? JSON.stringify(loadOptions.filter) : null,
    isLoadingAll: loadOptions.isLoadingAll,
  };

  if (loadOptions?.group?.length > 0) {
    paging.dataField = loadOptions.group[0].selector;
  } else {
    paging.dataField = loadOptions.dataField;
  }

  paging.requireTotalCount = loadOptions.requireTotalCount;
  paging.userData = extraData;

  return paging;
};

export const prepareSearchBody = (loadOptions, extraData) => {
  let body = loadOptions;
  body.userData = extraData;

  if (body.filter) return Promise.resolve([]);

  if (body.searchValue) {
    body.filter = JSON.stringify([body.searchExpr, "contains", body.searchValue]);
  }

  return body;
};

export const searchRequestLoad = (url, loadOptions, axiosInstance) => {
  return axiosInstance
    .post(url, prepareSearchBody(loadOptions))
    .then((response) => {
      const res = response.data;
      if (res.Success) {
        return res.Items;
      } else {
        throw new Error(res.Error);
      }
    })
    .catch((error) => {
      console.error("Data loading error", error);
      throw error;
    });
};
