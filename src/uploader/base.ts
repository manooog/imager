interface uploadFile {
  b64: string;
  _file: File;
  name: string;
}
export default class Base {
  protected async transformFile(file: File): Promise<uploadFile> {
    let reader = new FileReader();

    reader.readAsDataURL(file);

    const b64: string = await new Promise((resolve) => {
      reader.addEventListener("load", () => {
        resolve(reader.result as string);
      });
    });

    let [type, data] = b64.split(",");

    return {
      b64: data,
      name: +new Date() + "-" + file.name,
      _file: file,
    };
  }
}
