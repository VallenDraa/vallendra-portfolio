import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { IProject } from "../../interfaces/projectInterfaces";
import allProjects from "../../utils/datas/projects/allProjects";
import Head from "next/head";

interface IProps {
  project: IProject;
}

export default function ProjectDetails({ project }: IProps) {
  return (
    <>
      <Head>
        <title>VallenDra | {project.name}</title>
      </Head>
      <div>ProjectDetails</div>
    </>
  );
}

export function getServerSideProps(
  context: GetServerSidePropsContext
): GetServerSidePropsResult<IProps> {
  const { params } = context;
  const project = allProjects.find((project) => project.slug === params?.slug);

  /* check if the project exists
  ============================= */
  return !project ? { notFound: true } : { props: { project } };
}
