import { sql } from "../config/db.js";

export const publishForm = async (req, res) => {
    console.log(JSON.stringify(req.body));
    const { userId, formFields } = req.body;
    console.log(userId);
    console.log(formFields);
    try {
        const result = await sql`
        INSERT INTO forms (user_id, form_fields, title)
        VALUES (${userId}, ${JSON.stringify(formFields)}, ${formFields.title})
        RETURNING *
        `;
        console.log(result);
        return res.status(201).json({ success: true });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ success: false });
    }
}

export const getForms = async (req, res) => {
    const { userId } = req.query;
    // console.log("\n\nfrom here")
    // console.log(userId);
    try {
        const result = await sql`
        SELECT uuid, title, created_at, responses
        FROM forms 
        WHERE user_id = ${userId}
        ORDER BY created_at DESC
        `;
        console.log(result);
        return res.status(200).json({ success: true, data: result });
    } catch (e) {
        console.log(e);
        return res.status(404).json({ success: false });
    }
}

export const getForm = async (req, res) => {
    const { formId } = req.query;
    // console.log("\n\nfrom here")
    // console.log(userId);
    try {
        const result = await sql`
        SELECT form_fields
        FROM forms 
        WHERE uuid = ${formId}
        `;
        console.log(result);
        return res.status(200).json({ success: true, data: result[0] });
    } catch (e) {
        console.log(e);
        return res.status(404).json({ success: false });
    }
}

