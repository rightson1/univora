export const products_query = (search: string | null) => {
  const query = {
    $search: {
      index: "products",
      compound: {
        should: [
          {
            text: {
              query: search,
              path: "name",
              score: {
                boost: { value: 4 },
              },
              fuzzy: {
                maxEdits: 2,
                prefixLength: 3,
              },
            },
          },
          {
            text: {
              query: search,
              path: "brand",
              score: {
                boost: { value: 3 },
              },
              fuzzy: {
                maxEdits: 2,
                prefixLength: 3,
              },
            },
          },
          {
            text: {
              query: search,
              path: "tags",
              score: {
                boost: { value: 2 },
              },
              fuzzy: {
                maxEdits: 2,
                prefixLength: 3,
              },
            },
          },
          {
            text: {
              query: search,
              path: "description",
              score: {
                boost: { value: 1 },
              },
              fuzzy: {
                maxEdits: 2,
                prefixLength: 3,
              },
            },
          },
        ],
      },
    },
  };
  return query;
};
