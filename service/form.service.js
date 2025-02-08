const models = require("../models");
const FormFieldService = require("./formField.service");
const FormFieldOptionService = require("./formFieldOption.service");

class FormService {
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

      await Promise.all(
        formFields.map(async (formField) => {
          formField.formId = responseData.id;
          const formFieldData = await FormFieldService.insert(formField, {
            transaction,
          });

          if (
            formField.formFieldOptions &&
            formField.formFieldOptions.length > 0
          ) {
            await Promise.all(
              formField.formFieldOptions.map(async (option) => {
                option.formFieldId = formFieldData.id;
                await FormFieldOptionService.insert(option, { transaction });
              })
            );
          }
        })
      );

      await transaction.commit();
      return responseData;
    } catch (err) {
      await transaction.rollback();
      console.log(err.message);
    }
  };

  findAll = async () => {
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
  };

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
