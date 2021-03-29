const resolvers = {
  Query: {
    async findAllproject(parent, _, { db }) {
      if (db.payload.result.role === "admin") {
        return await db.project.findAll();
      } else {
        throw new Error("Access Denied");
      }
    },
    async projectByUserId(parent, args, { db }) {
      const idCreate = db.payload.result.id;
      if (
        db.payload.result.role === "planner" ||
        db.payload.result.role === "admin"
      ) {
        return await db.project.findAll({
          where: {
            created_by: idCreate,
          },
        });
      } else {
        throw new Error("Access Denied");
      }
    },

    async findOneProjectById(parent, args, { db }) {
      const idCreate = db.payload.result.id;
      if (
        db.payload.result.role === "planner" ||
        db.payload.result.role === "admin"
      ) {
        return await db.project.findOne({
          where: {
            id: args.id,
            created_by: idCreate,
          },
        });
      } else {
        throw new Error("Access Denied");
      }
    },
  },

  Mutation: {
    async createProject(parent, args, { db }) {
      if (
        db.payload.result.role === "planner" ||
        db.payload.result.role === "admin"
      ) {
        // console.log(db.payload.result.id)
        const idCreate = db.payload.result.id;
        const projectCreate = await db.project.create({
          created_by: idCreate,
          title: args.title,
          description: args.description,
        });
        return projectCreate;
      } else {
        throw new Error("Access Denied");
      }
    },

    async updateProject(parent, args, { db }) {
      if (
        db.payload.result.role === "planner" ||
        db.payload.result.role === "admin"
      ) {
        const upProject = {
          id: args.id,
          created_by: db.payload.result.id,
          title: args.title,
          description: args.description,
        };

        const projectUpdate = await db.project.update(upProject, {
          where: { id: args.id },
        });
        if (projectUpdate[0]) {
          const project = await db.project.findOne({
            where: { id: args.id },
          });
          return project;
        } else {
          throw new Error("Updated Project Not Found");
        }
      } else {
        throw new Error("Access Denied");
      }
    },

    async deleteProject(parent, args, { db }) {
      if (
        db.payload.result.role === "planner" ||
        db.payload.result.role === "admin"
      ) {
        const delProject = await db.project.destroy({
          where: { id: args.id, created_by: db.payload.result.id },
        });

        if (delProject) {
          return {
            message: "Deleted Done",
          };
        } else {
          throw new Error("Project Not Found");
        }
      }
    },
    async IsComplete(parent, args, { db }) {
      if (db.payload.result.role === "planner") {
        const newdata = {
          is_complete: true,
        };
        await db.project.update(newdata, {
          where: {
            id: args.id,
          },
        });
      } else {
        throw new Error("you are not allowed");
      }
    },
  },
};
module.exports = {
  resolvers,
};
