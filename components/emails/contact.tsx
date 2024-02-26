import { IOrder, IOrderFetched } from "@/types";
import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Img,
  Button,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

export const Contact_Form = ({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) => {
  return (
    <Html>
      <Head />
      <Body>
        <Tailwind
          config={{
            theme: {
              extend: {
                colors: {
                  brand: "#007291",
                },
              },
            },
          }}
        >
          <Container className="p-6 bg-white rounded shadow-md">
            <Text className="font-bold text-lg mb-2">{name}</Text>
            <Text className="font-semibold mb-2">{email}</Text>
            <Text>{message}</Text>
          </Container>
        </Tailwind>
      </Body>
    </Html>
  );
};
