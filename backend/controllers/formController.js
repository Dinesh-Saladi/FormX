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

export const formSubmission = async (req, res) => {
    const submissionData = req.body.formData;
    const formId = req.body.formId;
    try {
        const result = await sql`
        INSERT INTO submissions (submission_data, form_id)
        VALUES (${submissionData}, ${formId})
        RETURNING *;
        `;
        console.log(result);
        return res.status(201).json({ success: true });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ success: false });
    }
}

export const deleteForm = async (req, res) => {
    console.log(req.body.uuid);
    const { uuid } = req.body
    try {
        const result = await sql`
        DELETE FROM forms
        WHERE uuid = ${uuid}
        `;
        return res.status(200).json({ success: true });
    } catch (e) {
        return res.status(500).json({ success: false });
    }
}
