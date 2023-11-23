export interface User {
  id: string;
  name: string;
  edad: string;
  caract: {
    hobbys: {
      hobby: string[];
    };
    from: {
      Pais: string;
      ciudad: string;
    };
    itemns: {
      item: string[];
    };
  };
}
