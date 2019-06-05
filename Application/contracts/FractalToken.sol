//Solidity version 0.5.3
pragma solidity ^0.5.3;
// Importing OpenZeppelin's ERC-721 Implementation
import "openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol";

// Importing OpenZeppelin's SafeMath Implementation
import "openzeppelin-solidity/contracts/math/SafeMath.sol";


/**
  * Structure:
  *
  *
  *
  */

contract FractalToken is ERC721Full {
    using SafeMath for uint256;
    // This struct will be used to represent one fractal
    struct Fractal {
        uint8 genes;
        uint256 parent1Id;
        uint256 parent2Id;
    }

    // List of existing fractals
    Fractal[] public fractals;

    // Creation of a new fractal by combining two fractals
    event Creation(
        address owner,
        uint256 fractalId,
        uint256 parent1Id,
        uint256 parent2Id,
        uint8 genes
    );

    // Initializing an ERC-721 Token named 'Fractal' with a symbol 'FRC'
    constructor() ERC721Full("Fractals", "FRC") public {
    }

    // Fallback function
    function() external payable {
    }

    /** @dev Function to determine a fractal's characteristics.
      * @param parent1 ID of fractal's matron (one parent)
      * @param parent2 ID of fractal's sire (other parent)
      * @return The fractal's genes in the form of uint8
      */
    function generateFractalGenes(
        uint256 parent1,
        uint256 parent2
    )
        internal
        pure
        returns (uint8)
    {
        return uint8(parent1.add(parent2)) % 6 + 1;
    }

    /** @dev Function to create a new fractal
      * @param parent1 ID of new fractal's matron (one parent)
      * @param parent2 ID of new fractal's sire (other parent)
      * @param fractalOwner Address of new fractal's owner
      * @return The new fractal's ID
      */
    function createFractal(
        uint256 parent1,
        uint256 parent2,
        address fractalOwner
    )
        internal
        returns (uint)
    {
        require(fractalOwner != address(0));
        uint8 newGenes = generateFractalGenes(parent1, parent2);
        Fractal memory newFractal = Fractal({
            genes: newGenes,
            parent1Id: parent1,
            parent2Id: parent2
            
        });
        uint256 newFractalId = fractals.push(newFractal).sub(1);
        super._mint(fractalOwner, newFractalId);
        emit Creation(
            fractalOwner,
            newFractalId,
            newFractal.parent1Id,
            newFractal.parent2Id,
            newFractal.genes
        );
        return newFractalId;
    }

    /** @dev Function to allow user to buy a new fractal (calls createfractal())
      * @return The new fractal's ID
      */
    function buyFractal() external payable returns (uint256) {
        require(msg.value == 2.02 ether);
        return createFractal(0, 0, msg.sender);
    }

    /** @dev Function to breed 2 fractals to create a new one
      * @param parent1Id ID of new fractal's matron (one parent)
      * @param parent2Id ID of new fractal's sire (other parent)
      * @return The new fractal's ID
      */
    function breedFractal(uint256 parent1Id, uint256 parent2Id) external payable returns (uint256) {
        require(msg.value == 0.05 ether);
        return createFractal(parent1Id, parent2Id, msg.sender);
    }

    /** @dev Function to retrieve a specific fractal's details.
      * @param fractalId ID of the fractal who's details will be retrieved
      * @return An array, [fractal's ID, fractal's genes, matron's ID, sire's ID]
      */
    function getFractalDetails(uint256 fractalId) external view returns (uint256, uint8, uint256, uint256) {
        Fractal storage fractal = fractals[fractalId];
        return (fractalId, fractal.genes, fractal.parent1Id, fractal.parent2Id);
    }

    /** @dev Function to get a list of owned fractals' IDs
      * @return A uint array which contains IDs of all owned fractals
      */
    function ownedFractals() external view returns(uint256[] memory) {
        uint256 fractalCount = balanceOf(msg.sender);
        if (fractalCount == 0) {
            return new uint256[](0);
        } else {
            uint256[] memory result = new uint256[](fractalCount);
            uint256 totalFractals = fractals.length;
            uint256 resultIndex = 0;
            uint256 fractalId = 0;
            while (fractalId < totalFractals) {
                if (ownerOf(fractalId) == msg.sender) {
                    result[resultIndex] = fractalId;
                    resultIndex = resultIndex.add(1);
                }
                fractalId = fractalId.add(1);
            }
            return result;
        }
    }

    //TBD
    function releaseFractal(uint256 fractalId) external view returns (uint256, uint8, uint256, uint256) {
        Fractal storage fractal = fractals[fractalId];
        return (fractalId, fractal.genes, fractal.parent1Id, fractal.parent2Id);
    }
}
