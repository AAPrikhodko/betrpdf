import WebViewer from "@pdftron/webviewer";

export const PDFService = {
    async getWebViewer(viewer: any) {
        return WebViewer(
            {
                path: '/lib',
                initialDoc: '/files/ISG_Zentrum.pdf'
            }, viewer.current as HTMLDivElement
        )
    },
}
