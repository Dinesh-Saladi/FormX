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