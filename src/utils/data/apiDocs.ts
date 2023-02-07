const apiDocs = {
  api_docs: {
    project_endpoints: {
      views: [
        {
          path: "/api/views/projects",
          methods: ["GET"],
          desc: "get the views of all the projects",
        },
        {
          path: "/api/views/projects/[project-id]",
          methods: ["GET", "PUT"],
          desc: "get the views of a single project or increment the views",
        },
      ],
      likes: [
        {
          path: "/api/likes/projects",
          methods: ["GET"],
          desc: "get the likes of all the projects",
        },
        {
          path: "/api/likes/projects/[project-id]",
          methods: ["GET", "PUT"],
          desc: "get the likes of a single project or increment/decrement the views",
          body: {
            PUT: { operation: "increment | decrement" },
          },
        },
      ],
    },
    certificate_endpoints: {
      views: [
        {
          path: "/api/views/certificates",
          methods: ["GET"],
          desc: "get the views of all the certificates",
        },
        {
          path: "/api/views/certificates/[certificate-id]",
          methods: ["GET", "PUT"],
          desc: "get the views of a single certificate or increment the views",
        },
      ],
      likes: [
        {
          path: "/api/likes/certificates",
          methods: ["GET"],
          desc: "get the likes of all the certificates",
        },
        {
          path: "/api/likes/certificates/[certificate-id]",
          methods: ["GET", "PUT"],
          desc: "get the likes of a single certificate or increment/decrement the views",
          body: {
            PUT: { operation: "increment | decrement" },
          },
        },
      ],
    },
  },
};

export default apiDocs;
