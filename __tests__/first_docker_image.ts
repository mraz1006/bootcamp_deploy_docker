import {removeContainerAndImage} from "@/testutils/docker";
import {InMemoryWritableStream} from "@/testutils/in_memory_writable_stream";
import Dockerode from "dockerode";
import path from "path";

const docker = new Dockerode();

const IMAGE_NAME = "path-bootcamp-first-docker-image__test:latest";

afterAll(async () => {
  await removeContainerAndImage(docker, IMAGE_NAME);
});

describe("first-docker-image", (): void => {
  test("build image and run successfully", async () => {
    const stream = await docker.buildImage(
      {
        context: path.join(path.resolve(), "first-docker-image"),
        src: ["Dockerfile"],
      },
      {t: IMAGE_NAME}
    );
    await new Promise((resolve, reject) => {
      docker.modem.followProgress(stream, (err, res) =>
        err ? reject(err) : resolve(res)
      );
    });
    const stdoutStream = new InMemoryWritableStream();
    const data = await docker.run(IMAGE_NAME, [], stdoutStream, {
      HostConfig: {AutoRemove: true},
    });
    const output = data[0];
    expect(output.StatusCode).toBe(0);
    const stdoutBuffer = await stdoutStream.getBuffer();

    // stdout must be the output of https://api.github.com/users/progate.
    const githubProgateData = JSON.parse(stdoutBuffer.toString());
    expect(githubProgateData.login).toBe("Progate");
  });
});
