import Button from "@/components/button";
import Input from "@/components/input";
import InputButton from "@/components/input_button";

export default function Home() {
  return (
    <div style={{ display: "flex" }}>
      <div>Hello</div>
      <div>
        <Button>BUTTON</Button>
      </div>
      <div>
        <Input placeholder="working" inputColor="brown" />
      </div>
      <div>
        <InputButton buttonColor="brown">BUTTON</InputButton>
      </div>
    </div>
  );
}
