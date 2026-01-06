const fs = require('fs');

const getContainerId = () => {
    const cgroupFile = '/proc/self/cgroup';
    if (fs.existsSync(cgroupFile)) {
        const content = fs.readFileSync(cgroupFile, 'utf8');
        const lines = content.split('\n');
        for (const line of lines) {
            const parts = line.split('/');
            if (parts.length > 2) {
                return parts[parts.length - 1].trim(); 
            }
        }
    }
    return null;
};

module.exports = {
    getContainerId
};