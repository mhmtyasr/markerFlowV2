import { IElementData } from "../../models/common/ElementData";

export type CreateTopicFormValues = {
  coment: string;
  title: string;
  elementData?: IElementData;
  mentions: number[];
};

export type CreateTopicFormProps = {
  onCancel: () => void;
  initialValues?: CreateTopicFormValues;
};
