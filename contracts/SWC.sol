// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SWC is ERC721A, Ownable {
    
    using Strings for uint256;
    string public baseExtension = ".json";
    string public baseURI;
    uint256 public maxSupply = 10000;
    uint256 public maxMintAmount = 10000;

    constructor(string memory name, string memory sym) ERC721A(name, sym) {
        setBaseURI(
            "BASE URL"
        );
        mint(10);
    }

    function mint(uint256 quantity) public payable {
        uint256 supply = totalSupply();
        require(msg.sender == owner());
        require(quantity > 0);
        require(quantity <= maxMintAmount);
        require(supply + quantity <= maxSupply);

        _mint(msg.sender, quantity);
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent tokens"
        );

        string memory currentBaseURI = _baseURI();
        return
            bytes(currentBaseURI).length > 0
                ? string(
                    abi.encodePacked(
                        currentBaseURI,
                        tokenId.toString(),
                        baseExtension
                    )
                )
                : "";
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    function withdraw() public payable onlyOwner {
        (bool os, ) = payable(owner()).call{value: address(this).balance}("");
        require(os);
    }
}