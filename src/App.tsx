import { MasterMind } from "./mastermind";
import {
  ChakraProvider,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import "./style.css";
import { Instructions } from "./Instructions";

function App(): JSX.Element {
  return (
    <>
      <ChakraProvider>
        <Tabs variant="soft-rounded" colorScheme="pink">
          <TabList>
            <Tab>Game</Tab>
            <Tab>How To Play</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <h1 className="Title">Mastermind</h1>
              <MasterMind />
            </TabPanel>
            <TabPanel>
              <Instructions />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </ChakraProvider>
    </>
  );
}

export default App;
