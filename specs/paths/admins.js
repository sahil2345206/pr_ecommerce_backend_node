module.exports = [
  {
    url: "/create",
    post: {
      summary: "create",
      description: "create",
      parameters: [
        {
          in: "formData",
          name: "name",
          description: "enter Name",
          type: "string",
          // required: true,
        },

        {
          in: "formData",
          name: "email",
          description: "enter email",
          type: "string",
          required: true,
        },
        {
          in: "formData",
          name: "college",
          description: "enter college",
          type: "string",
          required: false,
        },
        {
          in: "formData",
          name: "phoneNumber",
          description: "enter phoneNumber",
          type: "number",
          required: true,
        },
        {
          in: "formData",
          name: "role",
          description: "enter role",
          type: "string",
          required: false,
        },
        {
          in: "formData",
          name: "lastQualification",
          description: "enter lastQualification",
          type: "string",
          required: false,
        },
        // {
        //     in: "formData",
        //     name: "DOB",
        //     description: "enter DOB",
        //     type: "string",

        // },
        {
          in: "formData",
          name: "course",
          description: "enter course",
          type: "string",
          required: false,
        },
        {
          in: "formData",
          name: "password",
          description: "enter password",
          type: "string",
          required: false,
        },
        // {
        //   in: "formData",
        //   name: "signature",
        //   description: "Select  your signature",
        //   type: "file",
        // },
        {
          in: "formData",
          type: "file",
          name: "image",
          description: "uploading profile image",
          required: true,
        },
        //     {
        //     in: "body",
        //     name: "body",
        //     description: "Model of user creation",
        //     required: true,
        //     schema: {
        //         $ref: "#/definitions/userCreate"
        //     }
        // }
      ],
      responses: {
        default: {
          description: "Unexpected error",
          schema: {
            $ref: "#/definitions/Error",
          },
        },
      },
    },
  },
//   {
//     url: "/create",
//     post: {
//         summary: "create",
//         description: "create",
//         parameters: [{
//             in: "body",
//             name: "body",
//             description: "Model of user creation",
//             required: true,          
//             schema: {
//                 $ref: "#/definitions/userCreate"
//             }
//         }],
//         responses: {
//             default: {
//                 description: "Unexpected error",
//                 schema: {
//                     $ref: "#/definitions/Error"
//                 }
//             }
//         }
//     }
// }, 



  {
    url: "/login",
    post: {
      summary: "login",
      description: "login",
      parameters: [
        {
          in: "body",
          name: "body",
          description: "Model of user login",
          required: true,
          schema: {
            $ref: "#/definitions/login",
          },
        },
      ],
      responses: {
        default: {
          description: "Unexpected error",
          schema: {
            $ref: "#/definitions/Error",
          },
        },
      },
    },
  },
  {
    url: "/delete/{id}",
    delete: {
      summary: "delete user",
      description: "delete user",
      parameters: [
        {
          in: "header",
          name: "x-access-token",
          description: "token to access api",
          required: true,
          type: "string",
        },
        {
          in: "path",
          name: "id",
          description: "Model of delete user",
          type: "string",
          required: true,
        },
      ],
      responses: {
        default: {
          description: "Unexpected error",
          schema: {
            $ref: "#/definitions/Error",
          },
        },
      },
    },
  },

  {
    url: "/changePassword/{id}",
    put: {
      summary: "Change Password",
      description: "reset Password",
      parameters: [
        {
          in: "header",
          name: "x-access-token",
          description: "token to access api",
          required: true,
          type: "string",
        },
        {
          in: "path",
          name: "id",
          description: "user id",
          required: true,
          type: "string",
        },

        {
          in: "body",
          name: "body",
          description: "Model of changePassword user",
          required: true,
          schema: {
            $ref: "#/definitions/resetPassword",
          },
        },
      ],
      responses: {
        default: {
          description: "Unexpected error",
          schema: {
            $ref: "#/definitions/Error",
          },
        },
      },
    },
  },
  {
    url: "/forgotPassword",
    post: {
      summary: "forgotPassword",
      description: "forgotPassword",
      parameters: [
        {
          in: "body",
          name: "body",
          description: "Model of forgotPassword",
          required: true,
          schema: {
            $ref: "#/definitions/forgotPassword",
          },
        },
      ],
      responses: {
        default: {
          description: "Unexpected error",
          schema: {
            $ref: "#/definitions/Error",
          },
        },
      },
    },
  },

  {
    url: "/getById/{id}",
    get: {
      summary: "getById",
      description: "Just hit the api",
      parameters: [
        {
          in: "header",
          name: "x-access-token",
          description: "token to access api",
          required: true,
          type: "string",
        },
        {
          in: "path",
          name: "id",
          description: "User id",
          required: true,
          type: "string",
        },
      ],
      responses: {
        default: {
          description: "Unexpected error",
          schema: {
            $ref: "#/definitions/Error",
          },
        },
      },
    },
  },
  {
    url: "/getAll",
    get: {
      summary: "getUsers",
      description: "Just hit the api",
      parameters: [
        // {
        //     in: "path",
        //     name: "id",
        //     description: "User id",
        //     required: true,
        //     type: "string",

        // },
        {
          in: "header",
          name: "x-access-token",
          description: "token to access api",
          required: true,
          type: "string",
        },
        {
          in: "query",
          name: "pageNo",
          description: "enter by ",
          required: true,
          type: "string",
        },
        {
          in: "query",
          name: "pageSize",
          description: "enter by ",
          required: true,
          type: "string",
        },
      ],
      responses: {
        default: {
          description: "Unexpected error",
          schema: {
            $ref: "#/definitions/Error",
          },
        },
      },
    },
  },

  // {{
  //   url: "/getAgencyUsers/{agencyId}",
  //   get: {
  //     summary: "getAgencyUsers",
  //     description: "Just hit the api",
  //     parameters: [
  //       {
  //         in: "header",
  //         name: "x-access-token",
  //         description: "token to access api",
  //         required: true,
  //         type: "string",
  //       },
  //       {
  //         in: "path",
  //         name: "agencyId",
  //         description: "agency id",
  //         required: true,
  //         type: "string",
  //       },
  //     ],
  //     responses: {
  //       default: {
  //         description: "Unexpected error",
  //         schema: {
  //           $ref: "#/definitions/Error",
  //         },
  //       },
  //     },
  //   },
  // },
  {
    url: "/update/{id}",
    put: {
      summary: "update",
      description: "update",
      parameters: [
        {
          in: "header",
          name: "x-access-token",
          description: "token to access api",
          required: true,
          type: "string",
        },
        // {

        //     in: "header",
        //     name: "x-access-token",
        //     description: "token to access api",
        //     required: true,
        //     type: "string"
        // },
        {
          in: "path",
          type: "string",
          name: "id",
          description: "user id",
          required: true,
        },

        {
            in: "formData",
            name: "name",
            description: "enter name",
            type: "string",
            required: false,
        },
        // {
        //     in: "formData",
        //     name: "email",
        //     description: "enter email",
        //     type: "string",
        //     required: false,
        // },
        {
            in: "formData",
            name: "college",
            description: "enter college",
            type: "string",
            required: false,
        },
        {
            in: "formData",
            name: "phoneNumber",
            description: "enter phoneNumber",
            type: "number",

        },

        {
            in: "formData",
            name: "lastQualification",
            description: "enter lastQualification",
            type: "string",

        },
        {
            in: "formData",
            name: "interestedIn",
            description: "enter interestedIn",
            type: "string",

        },
        {
            in: "formData",
            name: "role",
            description: "enter role",
            type: "string",

        },
        {
            in: "formData",
            name: "course",
            description: "enter course",
            type: "string",

        },
        {
          in: "formData",
          name: "password",
          description: "enter password",
          type: "string",
          required: false,
        },
        {
          in: "formData",
          type: "file",
          name: "image",
          description: "uploading profile image",
          required: true,
        },
        // {
        //   in: "body",
        //   name: "body",
        //   description: "Model of user update",
        //   required: true,
        //   schema: {
        //     $ref: "#/definitions/updateUser",
        //   },
        // },
      ],
      responses: {
        default: {
          description: "Unexpected error",
          schema: {
            $ref: "#/definitions/Error",
          },
        },
      },
    },
  },
  {
    url: "/uploadProfile/{id}",
    put: {
      summary: "upload Profile",
      description: "upload Profile",
      parameters: [
        {
          in: "header",
          name: "x-access-token",
          description: "token to access api",
          required: true,
          type: "string",
        },
        // {
        //     in: "header",
        //     name: "x-access-token",
        //     description: "token to access api",
        //     required: true,
        //     type: "string"
        // },
        {
          in: "path",
          type: "string",
          name: "id",
          description: "user id",
          required: true,
        },
        {
          in: "formData",
          type: "file",
          name: "image",
          description: "uploading profile image",
          required: true,
        },
      ],
      responses: {
        default: {
          description: "Unexpected error",
          schema: {
            $ref: "#/definitions/Error",
          },
        },
      },
    },
  },

  // {
  //   url: "/getAgencyUsers/{agencyId}",
  //   get: {
  //     summary: "getAgencyUsers",
  //     description: "Just hit the api",
  //     parameters: [
  //       {
  //         in: "header",
  //         name: "x-access-token",
  //         description: "token to access api",
  //         required: true,
  //         type: "string",
  //       },
  //       {
  //         in: "path",
  //         name: "agencyId",
  //         description: "agency id",
  //         required: true,
  //         type: "string",
  //       },
  //     ],
  //     responses: {
  //       default: {
  //         description: "Unexpected error",
  //         schema: {
  //           $ref: "#/definitions/Error",
  //         },
  //       },
  //     },
  //   },
  // },

  // {
  //     url: "/currentUser/{id}",
  //     get: {
  //         summary: "currentUser",
  //         description: "currentUser",
  //         parameters: [
  //             {
  //                 in: "header",
  //                 name: "x-access-token",
  //                 description: "token to access api",
  //                 required: true,
  //                 type: "string"
  //             },
  //             {
  //                 in: "path",
  //                 type: "string",
  //                 name: "id",
  //                 description: "user id",
  //                 required: true
  //             },],
  //         responses: {
  //             default: {
  //                 description: "Unexpected error",
  //                 schema: {
  //                     $ref: "#/definitions/Error"
  //                 }
  //             }
  //         }
  //     }
  // },
  // {
  //     url: "/delete/{id}",
  //     delete: {
  //         summary: "delete",
  //         description: "delete",
  //         parameters: [
  //             {
  //                 in: "header",
  //                 name: "x-access-token",
  //                 description: "token to access api",
  //                 required: true,
  //                 type: "string"
  //             },
  //             {
  //                 in: "path",
  //                 type: "string",
  //                 name: "id",
  //                 description: "user id",
  //                 required: true
  //             },],
  //         responses: {
  //             default: {
  //                 description: "Unexpected error",
  //                 schema: {
  //                     $ref: "#/definitions/Error"
  //                 }
  //             }
  //         }
  //     }
  // },

  // {
  //     url: "/uploadProfilePic/{id}",
  //     put: {
  //         summary: "upload Profile Pic ",
  //         description: "upload Profile Pic ",
  //         parameters: [{
  //             in: "formData",
  //             name: "image",
  //             type: "file",
  //             description: "The file to upload.",
  //             required: true,
  //         },
  //         {
  //             in: "path",
  //             type: "string",
  //             name: "id",
  //             description: "user id",
  //             required: true
  //         }
  //         ],
  //         responses: {
  //             default: {
  //                 description: "Unexpected error",
  //                 schema: {
  //                     $ref: "#/definitions/Error"
  //                 }
  //             }
  //         }
  //     }
  // }

  {
    url: "/sendOtp/{id}",
    get: {
      summary: "send Otp",
      description: "send Otp",
      parameters: [
        {
          in: "path",
          name: "id",
          description: "enter manager ID",
          required: true,
        },
      ],
      responses: {
        default: {
          description: "Unexpected error",
          schema: {
            $ref: "#/definitions/Error",
          },
        },
      },
    },
  },

  {
    url: "/getEmployees",
    get: {
      summary: "",
      description: "Just hit the api",
      parameters: [
        {
          in: "header",
          name: "x-access-token",
          description: "token to access api",
          required: true,
          type: "string",
        },
        // {
        //     in: "path",
        //     name: "agencyId",
        //     description: "agency id",
        //     required: true,
        //     type: "string",

        // },
      ],
      responses: {
        default: {
          description: "Unexpected error",
          schema: {
            $ref: "#/definitions/Error",
          },
        },
      },
    },
  },

  {
    url: "/verifyOtp",
    post: {
      summary: "",
      description: "Just hit the api",
      parameters: [
        {
          in: "body",
          name: "body",
          description: " model of opt verification",
          required: true,
          schema: {
            $ref: "#/definitions/verifyOtp",
          },
        },
      ],
      responses: {
        default: {
          description: "Unexpected error",
          schema: {
            $ref: "#/definitions/error",
          },
        },
      },
    },
  },

  // {
  //   url: "/signatureUpdate/{id}",
  //   put: {
  //     summary: "signature update",
  //     description: "signature update",
  //     parameters: [
  //       {
  //         in: "header",
  //         name: "x-access-token",
  //         description: "token to access api",
  //         required: true,
  //         type: "string",
  //       },
        // {
        //     in: "header",
        //     name: "x-access-token",
        //     description: "token to access api",
        //     required: true,
        //     type: "string"
        // },
      //   {
      //     in: "path",
      //     type: "string",
      //     name: "id",
      //     description: "user id",
      //     required: true,
      //   },
      //   {
      //     in: "formData",
      //     type: "file",
      //     name: "signature",
      //     description: "uploading signature",
      //     required: true,
      //   },
      // ],
  //     responses: {
  //       default: {
  //         description: "Unexpected error",
  //         schema: {
  //           $ref: "#/definitions/Error",
  //         },
  //       },
  //     },
  //   },
  // },
  {
    url: "/searchEmployees",
    get: {
      summary: "search employee",
      description: "Just post your wish",
      parameters: [
        {
          in: "header",
          name: "x-access-token",
          description: "token to access api",
          required: true,
          type: "string",
        },
        {
          in: "query",
          name: "search",
          description: "enter values",
          required: true,
          type: "string",
        },
      ],
      responses: {
        default: {
          description: "Unexpected error",
          schema: {
            $ref: "#/definitions/Error",
          },
        },
      },
    },
  },



  {
    url: "/search",
    get: {
        summary: "search",
        description: "search by name",
        parameters: [
            {
                in: "header",
                name: "x-access-token",
                description: "token to access api",
                required: true,
                type: "string"
            }, {
                in: 'query',
                type: "string",
                name: 'name',
                description: 'name',
                required: false,
            },
            {
              in: 'query',
              type: "string",
              name: 'role',
              description: 'role',
              required: false,
          }
        ],
        responses: {
            default: {
                description: "Unexpected error",
                schema: {
                    $ref: "#/definitions/Error"
                }
            }
        }
    }
},

  // {
  //   url: "/searchEmployeeByAgency",
  //   get: {
  //     summary: "search employee",
  //     description: "Just post your wish",
  //     parameters: [
  //       {
  //         in: "header",
  //         name: "x-access-token",
  //         description: "token to access api",
  //         required: true,
  //         type: "string",
  //       },
  //       {
  //         in: "query",
  //         name: "agencyId",
  //         description: "enter values",
  //         required: true,
  //         type: "string",
  //       },
  //       {
  //         in: "query",
  //         name: "search",
  //         description: "enter values",
  //         required: true,
  //         type: "string",
  //       },
  //     ],
  //     responses: {
  //       default: {
  //         description: "Unexpected error",
  //         schema: {
  //           $ref: "#/definitions/Error",
  //         },
  //       },
  //     },
  //   },
  // },
  // {
  //   url: "/managerLogin",
  //   post: {
  //     summary: "create",
  //     description: "create",
  //     parameters: [
  //       {
  //         in: "body",
  //         name: "body",
  //         description: "Model of login as manager",
  //         required: true,
  //         schema: {
  //           $ref: "#/definitions/managerLogin",
  //         },
  //       },
  //     ],
  //     responses: {
  //       default: {
  //         description: "Unexpected error",
  //         schema: {
  //           $ref: "#/definitions/Error",
  //         },
  //       },
  //     },
  //   },
  // },

//   {
//     url: "/adminLogin",
//     post: {
//       summary: "login as a admin",
//       description: "login as a admin",
//       parameters: [
//         {
//           in: "body",
//           name: "body",
//           description: "Model of admin login",
//           required: true,
//           schema: {
//             $ref: "#/definitions/adminLogin",
//           },
//         },
//       ],
//       responses: {
//         default: {
//           description: "Unexpected error",
//           schema: {
//             $ref: "#/definitions/Error",
//           },
//         },
//       },
//     },
//   },
];
