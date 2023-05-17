import {Buffer} from "node:buffer";
import {Writable, WritableOptions} from "node:stream";

export class InMemoryWritableStream extends Writable {
  private chunks: Uint8Array[] = [];
  private promise: Promise<Buffer>;

  constructor(options?: WritableOptions) {
    super(options);

    this.promise = new Promise(resolve => {
      this.on("close", () => {
        resolve(Buffer.concat(this.chunks));
      });
    });
  }

  _write(
    chunk: any,
    encoding: BufferEncoding,
    callback: (error?: Error | null) => void
  ): void {
    this.chunks.push(chunk);
    callback();
  }

  getBuffer(): Promise<Buffer> {
    return this.promise;
  }
}
