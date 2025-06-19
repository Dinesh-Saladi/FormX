import * as XLSX from "xlsx";

function Export(fields, responses, title) {
    const data = responses.map((response) => {
        const submission = JSON.parse(response.submission_data);
        const rows = {};
        fields.forEach((field) => {
            rows[field.label] = submission[field.uuid] || "";
        })
        return rows;
    })
    console.log(data);

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Responses");

    XLSX.writeFile(workbook, `${title}${Date.now()}.xlsx`);
}

export default Export