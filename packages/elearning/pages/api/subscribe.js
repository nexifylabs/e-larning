import Mailchimp from '@mailchimp/mailchimp_marketing';

Mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: 'us17',
});

async function addMemberToList(listId, email, name) {
    try {
        const response = await Mailchimp.lists.addListMember(listId, {
            email_address: email,
            status: 'subscribed',
            merge_fields: {
                MERGE1: name,
            },
        });
        return { status: response.status };
    } catch (error) {
        return { error: error.message || 'Usuário já cadastrado' };
    }
}

export default async (req, res) => {
    const { email, name, audienceId } = req.body;

    try {
        const results = await Promise.all([
            addMemberToList(audienceId, email, name),
        ]);

        const hasError = results.some((result) => result.error);
        if (hasError) {
            res.status(500).json({ error: 'An error occurred', results });
        } else {
            res.status(200).json({ results });
        }
    } catch (error) {
        res.status(500).json({
            error: error.message || 'Something went wrong',
        });
    }
};
