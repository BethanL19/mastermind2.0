import { MasterMind } from "./mastermind";
import {
    ChakraProvider,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Heading,
    extendTheme,
} from "@chakra-ui/react";
import "./style.css";
import { Instructions } from "./Instructions";

function App(): JSX.Element {
    const theme = extendTheme({
        fonts: { heading: `'Cinzel', san-serif`, body: `'Cinzel', san-serif` },
    });
    return (
        <>
            <ChakraProvider theme={theme}>
                <Tabs
                    variant="soft-rounded"
                    colorScheme="teal"
                    align="center"
                    marginTop={"1vh"}
                >
                    <TabList>
                        <Tab>Game</Tab>
                        <Tab>How To Play</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Heading className="Title">Mastermind</Heading>
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
