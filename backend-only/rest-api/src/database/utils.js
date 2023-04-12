import fs from 'fs';

export const saveToDatabase = (DB) => {
    fs.writeFileSync('./db.json', JSON.stringify(DB, null, 2),
    { encoding: 'utf8' }
    );
};