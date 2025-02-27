export function chunkFile(file: File): Promise<any[]> {
    const chunkSize = 4 * 1024 * 1024; // 4MB in bytes
    const numberOfChunks = Math.ceil(file.size / chunkSize);
    const chunks: any[] = [];
  
    return new Promise((resolve, reject) => {
      let offset = 0;
  
      const readNextChunk = () => {
        if (offset >= file.size) {
          resolve(chunks); // Resolve when all chunks are read
          return;
        }
  
        const chunkBlob = file.slice(offset, offset + chunkSize);
        const reader = new FileReader();
  
        reader.onload = () => {
          if (reader.result instanceof ArrayBuffer) {
            chunks.push(chunkBlob);
            offset += chunkSize;
            readNextChunk(); // Read the next chunk
          } else {
            reject(new Error('File read failed'));
          }
        };
  
        reader.onerror = () => {
          reject(new Error('Error reading file chunk'));
        };
  
        reader.readAsArrayBuffer(chunkBlob);
      };
  
      readNextChunk(); // Start reading the first chunk
    });
  }
  