const fs = require('fs').promises;
const path = require('path');

const getLatestResponse = async (req, res) => {
    try {
        const dir = path.join(__dirname, '../responses');
        const files = await fs.readdir(dir);

        const jsonFiles = files
            .filter(file => file.startsWith('response_') && file.endsWith('.json'))
            .sort((a, b) => {
                const timeA = parseInt(a.match(/\d+/)[0]);
                const timeB = parseInt(b.match(/\d+/)[0]);
                return timeB - timeA; // descending → latest first
            });

        if (jsonFiles.length === 0) {
            return res.status(404).json({ error: 'No response files found.' });
        }

        const latestFilePath = path.join(dir, jsonFiles[0]);
        const data = await fs.readFile(latestFilePath, 'utf8');
        const json = JSON.parse(data);

        res.json(json);
    } catch (error) {
        console.error('❌ Error fetching latest response:', error);
        res.status(500).json({ error: 'Failed to load latest response.' });
    }
};

module.exports = { getLatestResponse };
