export const convertTemplate = async (template: string, data: { [key: string]: any }, fields: string[]): Promise<string | null> => {
  try {
    const dataKeys = Object.keys(data);

    const invalidKeys = dataKeys.filter(key => !fields.includes(key));
    if (invalidKeys?.length > 0) return null;

    let result = template;

    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const placeholder = new RegExp(`_${key}_`, 'g');
        result = result.replace(placeholder, data[key]);
      };
    };

    return result;
  } catch (error: any) {
    return error;
  };
};