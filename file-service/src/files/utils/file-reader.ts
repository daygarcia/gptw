export const read = (file: Express.Multer.File, type: string) => {
  if (type !== 'text/csv') return null;

  const fileContent = file.buffer.toString('utf8');

  return fileContent;
}
