export interface IPdfData {
    externalDocId: string
    mimeType: string
    title: string
    fileName: string
    documentField: IDocumentField[]
    id: string
}

export interface IDocumentField {
    fieldType: 'CHECKBOX' | 'COMBOBOX' | 'COMMENT'
    options: IOptions
}

export interface IOptions {
    visualisation: IVisualisation
    comboboxExtras: IComboboxExtras
}

export interface IVisualisation {
    location: ILocation
    width: number
    height: number
    borderWidth: number
    borderColor: string
    fontSize: number
    borderStyle: 'NORMAL' | 'DASH' | 'DOT'
    fontStyle: 'BOLD' | 'ITALIC' | 'PLAIN'
    fontColor: string
    padding: number
}

export interface ILocation {
    page: number
    x: number
    y: number
}

export interface IComboboxExtras {
    options: IOptionsObject
    defaultOptionKey: string
}

export interface IOptionsObject {
    [key: string]: string;
}