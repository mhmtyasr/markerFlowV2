import { IElementData } from "../../models/common/ElementData";

export type CreateCommentFormValues = {
  comment: string;
  elementData?: IElementData;
  mentions: number[];
};

export type CreateCommentFormProps = {
  onCancel: () => void;
  initialValues?: CreateCommentFormValues;
  topicId: number;
};
