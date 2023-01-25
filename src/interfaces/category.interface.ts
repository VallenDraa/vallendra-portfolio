interface Category<T = string> {
  _id: string;
  name: string;
  items: string[] | T[];
}

export default Category;
