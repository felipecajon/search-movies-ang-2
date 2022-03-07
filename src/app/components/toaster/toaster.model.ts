export enum ToasterType {
    DEFAULT = 'default',
    SUCCESS = 'success',
    DANGER = 'danger',
    WARNING = 'warning',
    INFO = 'info'
};

export class ToasterModel {
    id? : String;
    title? : String;
    content!: String;
    type: ToasterType = ToasterType.DEFAULT;
};