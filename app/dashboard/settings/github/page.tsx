"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import deletePAT from "@/mutations/delete-pat";
import upsertPAT from "@/mutations/upsert-pat";
import getGithubRepositories from "@/queries/get-github-repositories";
import getPAT from "@/queries/get-pat";
import { useEffect, useState } from "react";
import { Table, Button as RadixButton } from "@radix-ui/themes";
import insertRepository from "@/mutations/insert-repository";
import deleteRepository from "@/mutations/delete-repository";
import deleteGithubUser from "@/mutations/delete-github-user";
import getGithubUsers from "@/queries/get-github-users";
import insertGithubUser from "@/mutations/insert-github-user";

type GithubPAT = {
  user_id: string;
  created_at: string;
};

export default function GithubPATPage() {
  const [token, setToken] = useState("");
  const [repository, setRepository] = useState("");
  const [githubUserInput, setGithubUserInput] = useState("");
  const [currentPAT, setCurrentPAT] = useState<GithubPAT | null>(null);
  const [repositories, setRepositories] = useState<string[]>([]);
  const [githubUsers, setGithubUsers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    renderPAT();
  }, []);

  async function renderPAT() {
    setLoading(true);
    const { data } = await getPAT();

    setCurrentPAT(data ? data[0] : null);
    setLoading(false);

    if (data) {
      await renderGithubRepositories();
      await renderGithubUsers();
    }
  }

  async function handleUpdatePAT(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    await upsertPAT(token);
    setToken("");
    renderPAT();
    setLoading(false);
  }

  async function handleDeletePAT() {
    if (!currentPAT) return;
    setLoading(true);
    await deletePAT(currentPAT.user_id);
    setCurrentPAT(null);
    setLoading(false);
  }

  async function handleDeleteRepository(repository: string) {
    setLoading(true);
    // Add your delete logic here
    await deleteRepository(repository);
    await renderGithubRepositories();
    setLoading(false);
  }

  async function renderGithubRepositories() {
    const { data } = await getGithubRepositories();

    setRepositories(data);
  }

  async function handleInsertRepository(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    await insertRepository(repository);
    setRepository("");
    await renderGithubRepositories();
    setLoading(false);
  }

  async function handleDeleteGithubUser(githubUser: string) {
    setLoading(true);
    // Add your delete logic here
    await deleteGithubUser(githubUser);
    await renderGithubUsers();
    setLoading(false);
  }

  async function renderGithubUsers() {
    const { data } = await getGithubUsers();

    setGithubUsers(data);
  }

  async function handleInsertGithubUser(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    await insertGithubUser(githubUserInput);
    setGithubUserInput("");
    await renderGithubUsers();
    setLoading(false);
  }

  return (
    <div className="flex flex-col ml-8 p-5 gap-4 w-full">
      <h2 className="font-bold">GitHub Personal Access Token</h2>
      <form onSubmit={handleUpdatePAT}>
        <label className="block mb-4 w-full">
          <span className="block text-sm font-medium text-gray-700 mb-1">
            New PAT:
          </span>
          <div className="flex gap-4">
            <Input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              disabled={loading}
              className="w-full"
            />
            <div className="flex justify-stretch h-full gap-2">
              <RadixButton
                type="submit"
                className="h-full items-center"
                size="2"
                color="blue"
                variant="soft"
              >
                {currentPAT ? "Update PAT" : "Save PAT"}
              </RadixButton>
              <RadixButton
                className="h-full items-center"
                size="2"
                color="red"
                variant="soft"
                onClick={handleDeletePAT}
              >
                Delete
              </RadixButton>
            </div>
          </div>
        </label>
      </form>
      {currentPAT ? (
        <div>
          <span>
            Current PAT was created at:{" "}
            {new Date(currentPAT.created_at).toLocaleString()}
          </span>
          <br />
        </div>
      ) : (
        <p>No PAT saved.</p>
      )}
      <hr />
      <h2 className="font-bold">Configure GitHub repositories</h2>
      {currentPAT ? (
        <>
          <span className="block text-sm font-medium text-gray-700 mb-1">
            Add a new repository (owner/repo):
          </span>
          <form className="flex gap-4" onSubmit={handleInsertRepository}>
            <Input
              type="text"
              value={repository}
              onChange={(e) => setRepository(e.target.value)}
              disabled={loading}
              className="w-full"
            />
            <RadixButton
              className="h-full items-center"
              size="2"
              type="submit"
              color="blue"
              variant="soft"
              disabled={loading || !repository}
            >
              Add
            </RadixButton>
          </form>
          <Table.Root className="max-h-32">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Repositories</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {repositories.map((repo) => (
                <Table.Row key={repo}>
                  <Table.Cell className="flex gap-2">
                    <RadixButton
                      size="1"
                      color="red"
                      variant="soft"
                      onClick={async () => {
                        await handleDeleteRepository(repo);
                      }}
                    >
                      Delete
                    </RadixButton>
                    <span className="font-medium">{repo}</span>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </>
      ) : (
        <p>Please add a GitHub PAT to configure repositories.</p>
      )}
      <hr />
      <h2 className="font-bold">Configure your team</h2>
      {currentPAT ? (
        <>
          <span className="block text-sm font-medium text-gray-700 mb-1">
            Add your team members:
          </span>
          <form className="flex gap-4" onSubmit={handleInsertGithubUser}>
            <Input
              type="text"
              value={githubUserInput}
              onChange={(e) => setGithubUserInput(e.target.value)}
              disabled={loading}
              className="w-full"
            />
            <RadixButton
              className="h-full items-center"
              size="2"
              type="submit"
              color="blue"
              variant="soft"
              disabled={loading || !githubUserInput}
            >
              Add
            </RadixButton>
          </form>
          <Table.Root className="max-h-32">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Team members</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {githubUsers.map((user) => (
                <Table.Row key={user}>
                  <Table.Cell className="flex gap-2">
                    <RadixButton
                      size="1"
                      color="red"
                      variant="soft"
                      onClick={async () => {
                        await handleDeleteGithubUser(user);
                      }}
                    >
                      Delete
                    </RadixButton>
                    <span className="font-medium">{user}</span>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </>
      ) : (
        <p>Please add a GitHub PAT to configure repositories.</p>
      )}
    </div>
  );
}
