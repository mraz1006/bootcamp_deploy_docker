import Dockerode from "dockerode";

export const removeContainerAndImage = async (
  docker: Dockerode,
  imageName: string
): Promise<void> => {
  const containers = await docker.listContainers({
    all: true,
    filters: {ancestor: [imageName]},
  });

  await Promise.all(
    containers.map(async containerInfo => {
      const container = docker.getContainer(containerInfo.Id);
      await container.remove({force: true});
    })
  );
  const image = docker.getImage(imageName);
  await image.remove();
};
