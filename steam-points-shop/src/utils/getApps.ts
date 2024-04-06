export default async function getApps(url: string) {
  const appsResponse = await fetch(url);
  const appsData = await appsResponse.json();

  return appsData.applist.apps;
}
