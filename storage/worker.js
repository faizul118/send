onmessage = function (e) {
    const file = e.data.file;
    const chunkSize = 100 * 1024; // 100KB chunks (adjust as needed)
    let currentChunk = 0;
    let base64Content = '';

    // Read the file in chunks and encode each chunk in base64
    const reader = new FileReader();
    
    function readNextChunk() {
        const start = currentChunk * chunkSize;
        const end = Math.min(start + chunkSize, file.size);

        if (start >= file.size) {
            postMessage({ base64Content });
            return;
        }

        const chunk = file.slice(start, end);
        reader.onloadend = function () {
            base64Content += reader.result.split(',')[1];  // Add base64 part
            currentChunk++;
            readNextChunk();
        };
        reader.readAsDataURL(chunk);  // Read next chunk as base64
    }

    readNextChunk();  // Start reading the first chunk
};

