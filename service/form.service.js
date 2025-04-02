const models = require("../models");
const FormFieldService = require("./formField.service");
const FormFieldOptionService = require("./formFieldOption.service");

class FormService {
  // insert = async (data) => {
  //   const { name, description, formFields } = data;
  //   const transaction = await models.sequelize.transaction();
  //   try {
  //     const responseData = await models.Form.create(
  //       {
  //         name,
  //         description,
  //       },
  //       { transaction }
  //     );

  //     const getEmailId = await models.Field.findOne({
  //       where: { name: "email" },
  //     });
  //     let emailFieldCount = 0;
  //     await Promise.all(
  //       formFields.map(async (formField) => {

  //         // Check if the fieldTypeId matches getEmailId.id
  //       if (formField.fieldTypeId === getEmailId.id) {
  //         emailFieldCount++;
  //         if (emailFieldCount > 1) {
  //           // Rollback transaction and return 0
  //           await transaction.rollback();
  //           return 0;
  //         }
  //       }

  //         formField.formId = responseData.id;
  //         const formFieldData = await FormFieldService.insert(formField, {
  //           transaction,
  //         });

  //         if (
  //           formField.formFieldOptions &&
  //           formField.formFieldOptions.length > 0
  //         ) {
  //           await Promise.all(
  //             formField.formFieldOptions.map(async (option) => {
  //               option.formFieldId = formFieldData.id;
  //               await FormFieldOptionService.insert(option, { transaction });
  //             })
  //           );
  //         }
  //       })
  //     );

  //     await transaction.commit();
  //     return responseData;
  //   } catch (err) {
  //     await transaction.rollback();
  //     console.log(err.message);
  //     return 0;
  //   }
  // };
  insert = async (data) => {
    const { name, description, formFields } = data;
    const transaction = await models.sequelize.transaction();
    try {
      const responseData = await models.Form.create(
        {
          name,
          description,
        },
        { transaction }
      );
  
      const getEmailId = await models.Field.findOne({
        where: { name: "email" },
      });
  
      let emailFieldCount = 0;
  
      // Use a for...of loop instead of Promise.all
      for (const formField of formFields) {
        // Check if the fieldTypeId matches getEmailId.id
        if (formField.fieldTypeId === getEmailId.id) {
          emailFieldCount++;
          if (emailFieldCount > 1) {
            // Throw an error to exit the loop and trigger rollback
            throw new Error("More than one email field detected. Rolling back transaction.");
          }
        }
  
        formField.formId = responseData.id;
        const formFieldData = await FormFieldService.insert(formField, {
          transaction,
        });
  
        if (
          formField.formFieldOptions &&
          formField.formFieldOptions.length > 0
        ) {
          for (const option of formField.formFieldOptions) {
            option.formFieldId = formFieldData.id;
            await FormFieldOptionService.insert(option, { transaction });
          }
        }
      }
  
      await transaction.commit();
      return responseData;
    } catch (err) {
      // Rollback the transaction if an error occurs
      if (transaction.finished !== "rollback") {
        await transaction.rollback();
      }
      console.error(err.message);
      return 0;
    }
  };

  findAll = async () => {
    try {
      return await models.Form.findAll({
        include: [
          {
            model: models.FormField,
            as: "formFields",
            order: ['formFields', 'order', 'DESC'],
            include: [
              {
                model: models.FormFieldOption,
                as: "formFieldOptions",
              },
              {
                model: models.Field,
                as: "fieldType",
              }
            ],
          },
        ],
      });
    } catch (error) {
      console.log(error.message);
      throw error;
      
    }
  };

  findByPk = async (id) => {
    return await models.Form.findByPk(id, {
      include: [
        {
          model: models.FormField,
          as: "formFields",
          include: [
            {
              model: models.FormFieldOption,
              as: "formFieldOptions",
            },
            {
              model: models.Field,
              as: "fieldType",
            }
          ],
        },
      ],
    });
  }

  delete = async (id) => {
    const transaction = await models.sequelize.transaction();
    try {
      const form = await models.Form.findByPk(id, {
        include: [
          {
            model: models.FormField,
            as: "formFields",
            include: [
              {
                model: models.FormFieldOption,
                as: "formFieldOptions",
              },
            ],
          },
        ],
      });

      if (!form) {
        throw new Error("Form not found");
      }

      await Promise.all(
        form.formFields.map(async (formField) => {
          await models.FormFieldOption.destroy({
            where: { formFieldId: formField.id },
            transaction,
          });
          await models.FormField.destroy({
            where: { id: formField.id },
            transaction,
          });
        })
      );      
      await transaction.commit();
      return await models.Form.destroy({ where: { id } });
    } catch (err) {
      await transaction.rollback();
      console.log(err.message);
      throw err;
    }
  };
}

module.exports = new FormService();
