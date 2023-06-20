export const convertTemplate = (template: string, data: { [key: string]: any }): string => {
    let result = template;

    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const placeholder = new RegExp(`_${key}_`, 'g');
        result = result.replace(placeholder, data[key]);
      };
    };
  
    return result;
};