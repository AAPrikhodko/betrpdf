import {IDocumentField, IOptionsObject, IPdfData} from "../services/types";
import {WebViewerInstance} from "@pdftron/webviewer";
import {convertStringToRGB} from "../services/utils";

export const FormService = {

    // create options for combobox
    getComboOptions(options: IOptionsObject) {
        const result: { [p: string]: string }[] = []
        for (let key in options) {
            result.push({
                value: key,
                displayValue: (options)[key]
            })
        }
        return result
    },

    addFields(pdfData: IPdfData, instance: WebViewerInstance) {
        const {documentField} = pdfData
        const {documentViewer, annotationManager, Annotations} = instance.Core;

        documentViewer.addEventListener('documentLoaded', () => {
            documentField.forEach((df: IDocumentField) => {

                const {visualisation, comboboxExtras} = df.options
                const {x, y, page} = visualisation.location
                const pageWidth = documentViewer.getPageWidth(page)
                const pageHeight = documentViewer.getPageHeight(page)

                switch (df.fieldType) {
                    case "COMBOBOX": {
                        const options = this.getComboOptions(comboboxExtras.options)
                        debugger
                        const flags = new Annotations.WidgetFlags(null);
                        const field = new Annotations.Forms.Field("combobox", {
                            type: 'Ch',
                            value: comboboxExtras.defaultOptionKey,
                            flags,
                            options
                        });
                        const widgetAnnot = new Annotations.ChoiceWidgetAnnotation(field, null);

                        flags.set(Annotations.WidgetFlags.COMBO, true);

                        // set position, size, colors
                        widgetAnnot.PageNumber = page;
                        widgetAnnot.X = x * pageWidth;
                        widgetAnnot.Y = y * pageHeight;
                        widgetAnnot.Width = visualisation.width * pageWidth;
                        widgetAnnot.Height = visualisation.height * pageHeight;
                        widgetAnnot.font.size = visualisation.fontSize
                        widgetAnnot.font.fillColor = new Annotations.Color(
                            convertStringToRGB(visualisation.fontColor).getR(),
                            convertStringToRGB(visualisation.fontColor).getG(),
                            convertStringToRGB(visualisation.fontColor).getB()
                        )
                        widgetAnnot.border = new Annotations.Border({
                            width: visualisation.borderWidth,
                            color: new Annotations.Color(
                                convertStringToRGB(visualisation.borderColor).getR(),
                                convertStringToRGB(visualisation.borderColor).getG(),
                                convertStringToRGB(visualisation.borderColor).getB()
                            ),
                        })

                        //add the form field and widget annotation
                        annotationManager.getFieldManager().addField(field);
                        annotationManager.addAnnotation(widgetAnnot);
                        annotationManager.drawAnnotationsFromList([widgetAnnot]);
                        break
                    }
                    case "COMMENT": {
                        // to do add comment field
                        break
                    }
                    case "CHECKBOX": {
                        // to do add checkbox field
                        break
                    }
                }
            })
        });
    }
}