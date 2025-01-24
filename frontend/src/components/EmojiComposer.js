import React, { useState } from "react";
import { Row, Col, Form, InputGroup, Button, Badge } from "react-bootstrap";
import Picker from "@emoji-mart/react";

export default function EmojiComposer({ onStorySubmit }) {
  const [authorNickname, setAuthorNickname] = useState("");
  const [emojiSequence, setEmojiSequence] = useState([]);
  const [showPicker, setShowPicker] = useState(false);

  const addEmoji = (emojiObject) => {
    setEmojiSequence((prev) => [...prev, emojiObject.native]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emojiSequence.length === 0 || authorNickname.trim() === "") {
      alert("Please add Emojis and nickname");
      return;
    }
    onStorySubmit({ emojiSequence, authorNickname });
    setEmojiSequence([]);
    setAuthorNickname("");
  };
  return (
    <div>
      <Row>
        <Col md={8} className="mx-auto">
          <h2 className="text-center mb-3">Compose your Emoji Story</h2>
          <Form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
            <Form.Group className="mb-3">
              <Form.Label>Your Nickname</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Enter Your Nickname"
                value={authorNickname}
                onChange={(e) => setAuthorNickname(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Emoji Story</Form.Label>
              <InputGroup>
                <Form.Control
                  as="div"
                  className="d-flex flex-wrap align-item-center border-rounded p-2 bg-white"
                  style={{ minHeight: "50px", cursor: "pointer" }}
                  required
                  placeholder="Enter Emoji Story"
                >
                  {emojiSequence.map((emoji, index) => (
                    <Badge key={index}>{emoji}</Badge>
                  ))}
                </Form.Control>
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowPicker(!showPicker)}
                >
                  {showPicker ? "Close" : "Add Emoji"}
                </Button>
              </InputGroup>

              {showPicker && (
                <div>
                  <Picker onEmojiSelect={addEmoji}></Picker>
                </div>
              )}
            </Form.Group>
            <div className="text-center">
              <Button type="submit" variant="primary">
                Save Story
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
