export const isImageFile = (file) => {
  const fileType = file[0].type.substr(6, 15);
  if (fileType === "png" || fileType === "jpg" || fileType === "jpeg")
    return true;
  else return false;
};
