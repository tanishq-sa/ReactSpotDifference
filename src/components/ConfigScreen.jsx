import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';

const ConfigContainer = styled.div`
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 24px 0 rgba(31, 38, 135, 0.12);
  padding: 32px 24px;
  max-width: 600px;
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Label = styled.label`
  font-weight: 600;
  margin-bottom: 6px;
  color: #222;
`;

const Input = styled.input`
  padding: 8px 12px;
  background: #f7fafc;
  color:#222;
  border-radius: 8px;
  border: 1px solid #bdbdbd;
  font-size: 1rem;
  margin-bottom: 10px;
`;

const Checkbox = styled.input`
  margin-right: 8px;
`;

const Button = styled.button`
  background: #1976d2;
  color: #fff;
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  padding: 12px 28px;
  margin-top: 18px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(25, 118, 210, 0.10);
  transition: background 0.2s, transform 0.2s;
  &:hover {
    background: #1256a3;
    transform: translateY(-2px) scale(1.04);
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ImagesPreviewContainer = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  margin: 12px 0;
  flex-wrap: wrap;
`;

const ImagePreviewWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const ImagePreview = styled.img`
  max-width: 250px;
  max-height: 180px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  background: #f7fafc;
  display: block;
  margin: 0;
  padding: 0;
`;

const DiffCircle = styled.div`
  position: absolute;
  border: 2px solid #e53935;
  border-radius: 50%;
  pointer-events: none;
  width: 40px;
  height: 40px;
  transform: translate(-50%, -50%);
`;

const DiffList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 10px 0 0 0;
`;

const DiffListItem = styled.li`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
  color: #222;
`;

const RemoveBtn = styled.button`
  background: #e53935;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 2px 8px;
  font-size: 0.9rem;
  cursor: pointer;
`;

const FileInputLabel = styled.label`
  display: inline-block;
  background: #1976d2;
  color: #fff;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 8px;
  padding: 10px 22px;
  cursor: pointer;
  margin-bottom: 10px;
  margin-top: 4px;
  box-shadow: 0 2px 8px rgba(25, 118, 210, 0.10);
  transition: background 0.2s, transform 0.2s;
  &:hover {
    background: #1256a3;
    transform: translateY(-2px) scale(1.04);
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

export default function ConfigScreen({ onStart }) {
  const [gameTitle, setGameTitle] = useState('Spot the Difference');
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image1Url, setImage1Url] = useState(null);
  const [image2Url, setImage2Url] = useState(null);
  const [addDiffMode, setAddDiffMode] = useState(false);
  const [differences, setDifferences] = useState([]);
  const image1Ref = useRef();
  const image2Ref = useRef();

  const handleImage1Change = (e) => {
    const file = e.target.files[0];
    setImage1(file);
    if (file) {
      setImage1Url(URL.createObjectURL(file));
      setDifferences([]); // reset differences if image changes
    } else {
      setImage1Url(null);
    }
  };

  const handleImage2Change = (e) => {
    const file = e.target.files[0];
    setImage2(file);
    if (file) {
      setImage2Url(URL.createObjectURL(file));
      setDifferences([]); // reset differences if image changes
    } else {
      setImage2Url(null);
    }
  };

  // Add difference on image click (for either image)
  const handleImageClick = (e, which) => {
    if (!addDiffMode || !(image1Url && image2Url)) return;
    const img = e.target;
    const rect = img.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    setDifferences([...differences, {
      x: clickX,
      y: clickY,
      width: 40,
      height: 40,
      image: which,
      // For game logic, also store natural coords
      naturalX: (clickX * img.naturalWidth) / img.width,
      naturalY: (clickY * img.naturalHeight) / img.height
    }]);
  };

  const handleRemoveDiff = (idx) => {
    setDifferences(differences.filter((_, i) => i !== idx));
  };

  return (
    <ConfigContainer>
      <Label>Game Title:</Label>
      <Input
        type="text"
        value={gameTitle}
        onChange={e => setGameTitle(e.target.value)}
        placeholder="Enter game title"
      />

      <FileInputLabel>
        📷 Choose Image 1
        <HiddenInput type="file" accept="image/*" ref={image1Ref} onChange={handleImage1Change} />
      </FileInputLabel>
      {image1 && <span style={{marginLeft: 8}}>File Name:   {image1.name}</span>}

      <FileInputLabel>
        🖼️ Choose Image 2
        <HiddenInput type="file" accept="image/*" ref={image2Ref} onChange={handleImage2Change} />
      </FileInputLabel>
      {image2 && <span style={{marginLeft: 8}}>File Name: {image2.name}</span>}

      {image1Url && image2Url && (
        <ImagesPreviewContainer>
          <ImagePreviewWrapper>
            <ImagePreview
              ref={image1Ref}
              src={image1Url}
              alt="Preview 1"
              onClick={e => handleImageClick(e, 1)}
              style={{ cursor: addDiffMode ? 'crosshair' : 'default' }}
            />
            {differences.filter(d => d.image === 1).map((diff, idx) => (
              <DiffCircle
                key={idx}
                style={{ left: diff.x, top: diff.y, width: diff.width, height: diff.height }}
              />
            ))}
          </ImagePreviewWrapper>
          <ImagePreviewWrapper>
            <ImagePreview
              ref={image2Ref}
              src={image2Url}
              alt="Preview 2"
              onClick={e => handleImageClick(e, 2)}
              style={{ cursor: addDiffMode ? 'crosshair' : 'default' }}
            />
            {differences.filter(d => d.image === 2).map((diff, idx) => (
              <DiffCircle
                key={idx}
                style={{ left: diff.x, top: diff.y, width: diff.width, height: diff.height }}
              />
            ))}
          </ImagePreviewWrapper>
        </ImagesPreviewContainer>
      )}

      <DiffList>
        {differences.map((diff, idx) => (
          <DiffListItem key={idx}>
            On Image {diff.image}: x: {Math.round(diff.x)}, y: {Math.round(diff.y)} | For game: x: {Math.round(diff.naturalX)}, y: {Math.round(diff.naturalY)}
            <RemoveBtn onClick={() => handleRemoveDiff(idx)}>Remove</RemoveBtn>
          </DiffListItem>
        ))}
      </DiffList>

      <Button type="button" onClick={() => setAddDiffMode(!addDiffMode)}>
        {addDiffMode ? 'Click on image to add difference (then click again to disable)' : 'Enable Add Difference Mode'}
      </Button>

      <Button
        type="button"
        onClick={() => onStart && onStart({
          gameTitle,
          image1,
          image2,
          differences: differences.map(d => ({ image: d.image, x: d.naturalX, y: d.naturalY, width: 40, height: 40 }))
        })}
        disabled={!image1 || !image2 || differences.length === 0}
      >
        Start Game with Current Settings
      </Button>
    </ConfigContainer>
  );
} 