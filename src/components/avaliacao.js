import { useState } from "react";
// import { FaStar } from "react-icons/fa";
import {
    Avatar,
    Flex,
    HStack,
    Icon,
    IconButton,
    Text,
    Button,
    ButtonGroup,
    WrapItem,
    useBreakpointValue,
} from "@chakra-ui/react";

const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"

};

export function Avaliacao() {
    const [currentValue, setCurrentValue] = useState(0);
    const [hoverValue, setHoverValue] = useState(undefined);
    const stars = Array(5).fill(0)

    const handleClick = value => {
        setCurrentValue(value)
    }

    const handleMouseOver = newHoverValue => {
        setHoverValue(newHoverValue)
    };

    const handleMouseLeave = () => {
        setHoverValue(undefined)
    }


    return (
        <div style={styles.container}>
            <Text noOfLines={1} as='b' color={"black"} padding={10}> Avaliação da sua Experiência</Text>
            <Text noOfLines={1} as='a' color={"black"} padding={1}>Como você avalia a experiência na AutoMech </Text>
            {/* <div style={styles.stars}>
                {stars.map((_, index) => {
                    return (
                        <FaStar
                            key={index}
                            size={24}
                            onClick={() => handleClick(index + 1)}
                            onMouseOver={() => handleMouseOver(index + 1)}
                            onMouseLeave={handleMouseLeave}
                            color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
                            style={{
                                marginRight: 10,
                                cursor: "pointer"
                            }}
                        />
                    )
                })}
            </div> */}
            <textarea
                placeholder="Escreva aqui seu comentário"
                style={styles.textarea}
            />

            <WrapItem>
                <Button colorScheme='yellow' size='md'
                    height='48px'
                    width='300px'
                >
                    Avaliar</Button>
            </WrapItem>

        </div>
    );
};


const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    stars: {
        display: "flex",
        flexDirection: "row",
    },
    textarea: {
        border: "1px solid #a9a9a9",
        borderRadius: 5,
        padding: 10,
        margin: "20px 0",
        minHeight: 100,
        width: 300
    },
    button: {
        border: "1px solid #a9a9a9",
        borderRadius: 5,
        width: 300,
        padding: 10,
    }

};