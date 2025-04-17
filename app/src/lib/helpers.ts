type FormState = {
  [key: string]: string | Date | null | undefined;
};
export const validateInputs = (data: FormState): boolean => {
  return !(Object.keys(data) as (keyof FormState)[]).some(key => {
    const value = data[key as keyof FormState];
    return (
      value === null ||
      value === undefined ||
      (typeof value === 'string' && value.trim() === '')
    );
  });
};
