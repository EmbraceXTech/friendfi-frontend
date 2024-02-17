/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../common";
import type { FriendKey, FriendKeyInterface } from "../FriendKey";

const _abi = [
  {
    type: "constructor",
    inputs: [
      {
        name: "uri_",
        type: "string",
        internalType: "string",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "balanceOf",
    inputs: [
      {
        name: "account",
        type: "address",
        internalType: "address",
      },
      {
        name: "id",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "balanceOfBatch",
    inputs: [
      {
        name: "accounts",
        type: "address[]",
        internalType: "address[]",
      },
      {
        name: "ids",
        type: "uint256[]",
        internalType: "uint256[]",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256[]",
        internalType: "uint256[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "burn",
    inputs: [
      {
        name: "_from",
        type: "address",
        internalType: "address",
      },
      {
        name: "_tokenId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_value",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "burnBatch",
    inputs: [
      {
        name: "_from",
        type: "address",
        internalType: "address",
      },
      {
        name: "_ids",
        type: "uint256[]",
        internalType: "uint256[]",
      },
      {
        name: "_values",
        type: "uint256[]",
        internalType: "uint256[]",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "isApprovedForAll",
    inputs: [
      {
        name: "account",
        type: "address",
        internalType: "address",
      },
      {
        name: "operator",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "mint",
    inputs: [
      {
        name: "_to",
        type: "address",
        internalType: "address",
      },
      {
        name: "_tokenId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_value",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "mintBatch",
    inputs: [
      {
        name: "_to",
        type: "address",
        internalType: "address",
      },
      {
        name: "_ids",
        type: "uint256[]",
        internalType: "uint256[]",
      },
      {
        name: "_values",
        type: "uint256[]",
        internalType: "uint256[]",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "renounceOwnership",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "safeBatchTransferFrom",
    inputs: [
      {
        name: "from",
        type: "address",
        internalType: "address",
      },
      {
        name: "to",
        type: "address",
        internalType: "address",
      },
      {
        name: "ids",
        type: "uint256[]",
        internalType: "uint256[]",
      },
      {
        name: "values",
        type: "uint256[]",
        internalType: "uint256[]",
      },
      {
        name: "data",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "safeTransferFrom",
    inputs: [
      {
        name: "from",
        type: "address",
        internalType: "address",
      },
      {
        name: "to",
        type: "address",
        internalType: "address",
      },
      {
        name: "id",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "value",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "data",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setApprovalForAll",
    inputs: [
      {
        name: "operator",
        type: "address",
        internalType: "address",
      },
      {
        name: "approved",
        type: "bool",
        internalType: "bool",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "supportsInterface",
    inputs: [
      {
        name: "interfaceId",
        type: "bytes4",
        internalType: "bytes4",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "transferOwnership",
    inputs: [
      {
        name: "newOwner",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "uri",
    inputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "string",
        internalType: "string",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "ApprovalForAll",
    inputs: [
      {
        name: "account",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "operator",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "approved",
        type: "bool",
        indexed: false,
        internalType: "bool",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      {
        name: "previousOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "newOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "TransferBatch",
    inputs: [
      {
        name: "operator",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "from",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "to",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "ids",
        type: "uint256[]",
        indexed: false,
        internalType: "uint256[]",
      },
      {
        name: "values",
        type: "uint256[]",
        indexed: false,
        internalType: "uint256[]",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "TransferSingle",
    inputs: [
      {
        name: "operator",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "from",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "to",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "id",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "value",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "URI",
    inputs: [
      {
        name: "value",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "id",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "ERC1155InsufficientBalance",
    inputs: [
      {
        name: "sender",
        type: "address",
        internalType: "address",
      },
      {
        name: "balance",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "needed",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "error",
    name: "ERC1155InvalidApprover",
    inputs: [
      {
        name: "approver",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "ERC1155InvalidArrayLength",
    inputs: [
      {
        name: "idsLength",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "valuesLength",
        type: "uint256",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "error",
    name: "ERC1155InvalidOperator",
    inputs: [
      {
        name: "operator",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "ERC1155InvalidReceiver",
    inputs: [
      {
        name: "receiver",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "ERC1155InvalidSender",
    inputs: [
      {
        name: "sender",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "ERC1155MissingApprovalForAll",
    inputs: [
      {
        name: "operator",
        type: "address",
        internalType: "address",
      },
      {
        name: "owner",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "OwnableInvalidOwner",
    inputs: [
      {
        name: "owner",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "OwnableUnauthorizedAccount",
    inputs: [
      {
        name: "account",
        type: "address",
        internalType: "address",
      },
    ],
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162001819380380620018198339810160408190526200003491620000fe565b3381620000418162000084565b506001600160a01b0381166200007157604051631e4fbdf760e01b81526000600482015260240160405180910390fd5b6200007c8162000096565b505062000330565b600262000092828262000264565b5050565b600380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b634e487b7160e01b600052604160045260246000fd5b600060208083850312156200011257600080fd5b82516001600160401b03808211156200012a57600080fd5b818501915085601f8301126200013f57600080fd5b815181811115620001545762000154620000e8565b604051601f8201601f19908116603f011681019083821181831017156200017f576200017f620000e8565b8160405282815288868487010111156200019857600080fd5b600093505b82841015620001bc57848401860151818501870152928501926200019d565b600086848301015280965050505050505092915050565b600181811c90821680620001e857607f821691505b6020821081036200020957634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200025f576000816000526020600020601f850160051c810160208610156200023a5750805b601f850160051c820191505b818110156200025b5782815560010162000246565b5050505b505050565b81516001600160401b03811115620002805762000280620000e8565b6200029881620002918454620001d3565b846200020f565b602080601f831160018114620002d05760008415620002b75750858301515b600019600386901b1c1916600185901b1785556200025b565b600085815260208120601f198616915b828110156200030157888601518255948401946001909101908401620002e0565b5085821015620003205787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b6114d980620003406000396000f3fe608060405234801561001057600080fd5b50600436106100f45760003560e01c8063715018a611610097578063e985e9c511610066578063e985e9c514610206578063f242432a14610219578063f2fde38b1461022c578063f5298aca1461023f57600080fd5b8063715018a6146101bd5780638da5cb5b146101c5578063a22cb465146101e0578063d81d0a15146101f357600080fd5b8063156e29f6116100d3578063156e29f6146101625780632eb2c2d6146101775780634e1273f41461018a5780636b20c454146101aa57600080fd5b8062fdd58e146100f957806301ffc9a71461011f5780630e89341c14610142575b600080fd5b61010c610107366004610dd5565b610252565b6040519081526020015b60405180910390f35b61013261012d366004610e15565b61027a565b6040519015158152602001610116565b610155610150366004610e39565b6102ca565b6040516101169190610e98565b610175610170366004610eab565b61035e565b005b610175610185366004611028565b610386565b61019d6101983660046110d2565b6103f2565b60405161011691906111ce565b6101756101b83660046111e1565b6104bf565b6101756104d2565b6003546040516001600160a01b039091168152602001610116565b6101756101ee366004611255565b6104e6565b6101756102013660046111e1565b6104f5565b610132610214366004611291565b610518565b6101756102273660046112c4565b610546565b61017561023a366004611329565b6105a5565b61017561024d366004610eab565b6105e3565b6000818152602081815260408083206001600160a01b03861684529091529020545b92915050565b60006001600160e01b03198216636cdb3d1360e11b14806102ab57506001600160e01b031982166303a24d0760e21b145b8061027457506301ffc9a760e01b6001600160e01b0319831614610274565b6060600280546102d990611344565b80601f016020809104026020016040519081016040528092919081815260200182805461030590611344565b80156103525780601f1061032757610100808354040283529160200191610352565b820191906000526020600020905b81548152906001019060200180831161033557829003601f168201915b50505050509050919050565b6103666105f6565b61038183838360405180602001604052806000815250610623565b505050565b336001600160a01b03861681148015906103a757506103a58682610518565b155b156103dd5760405163711bec9160e11b81526001600160a01b038083166004830152871660248201526044015b60405180910390fd5b6103ea8686868686610680565b505050505050565b606081518351146104235781518351604051635b05999160e01b8152600481019290925260248201526044016103d4565b6000835167ffffffffffffffff81111561043f5761043f610ede565b604051908082528060200260200182016040528015610468578160200160208202803683370190505b50905060005b84518110156104b75760208082028601015161049290602080840287010151610252565b8282815181106104a4576104a461137e565b602090810291909101015260010161046e565b509392505050565b6104c76105f6565b6103818383836106e7565b6104da6105f6565b6104e4600061072d565b565b6104f133838361077f565b5050565b6104fd6105f6565b61038183838360405180602001604052806000815250610815565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205460ff1690565b336001600160a01b038616811480159061056757506105658682610518565b155b156105985760405163711bec9160e11b81526001600160a01b038083166004830152871660248201526044016103d4565b6103ea8686868686610853565b6105ad6105f6565b6001600160a01b0381166105d757604051631e4fbdf760e01b8152600060048201526024016103d4565b6105e08161072d565b50565b6105eb6105f6565b6103818383836108e1565b6003546001600160a01b031633146104e45760405163118cdaa760e01b81523360048201526024016103d4565b6001600160a01b03841661064d57604051632bfa23e760e11b8152600060048201526024016103d4565b604080516001808252602082018690528183019081526060820185905260808201909252906103ea600087848487610945565b6001600160a01b0384166106aa57604051632bfa23e760e11b8152600060048201526024016103d4565b6001600160a01b0385166106d357604051626a0d4560e21b8152600060048201526024016103d4565b6106e08585858585610945565b5050505050565b6001600160a01b03831661071057604051626a0d4560e21b8152600060048201526024016103d4565b610381836000848460405180602001604052806000815250610945565b600380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6001600160a01b0382166107a85760405162ced3e160e81b8152600060048201526024016103d4565b6001600160a01b03838116600081815260016020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b6001600160a01b03841661083f57604051632bfa23e760e11b8152600060048201526024016103d4565b61084d600085858585610945565b50505050565b6001600160a01b03841661087d57604051632bfa23e760e11b8152600060048201526024016103d4565b6001600160a01b0385166108a657604051626a0d4560e21b8152600060048201526024016103d4565b604080516001808252602082018690528183019081526060820185905260808201909252906108d88787848487610945565b50505050505050565b6001600160a01b03831661090a57604051626a0d4560e21b8152600060048201526024016103d4565b604080516001808252602082018590528183019081526060820184905260a082019092526000608082018181529192916106e0918791859085905b61095185858585610998565b6001600160a01b038416156106e0578251339060010361098a5760208481015190840151610983838989858589610bac565b50506103ea565b6103ea818787878787610cd0565b80518251146109c75781518151604051635b05999160e01b8152600481019290925260248201526044016103d4565b3360005b8351811015610acd576020818102858101820151908501909101516001600160a01b03881615610a7e576000828152602081815260408083206001600160a01b038c16845290915290205481811015610a57576040516303dee4c560e01b81526001600160a01b038a1660048201526024810182905260448101839052606481018490526084016103d4565b6000838152602081815260408083206001600160a01b038d16845290915290209082900390555b6001600160a01b03871615610ac3576000828152602081815260408083206001600160a01b038b16845290915281208054839290610abd908490611394565b90915550505b50506001016109cb565b508251600103610b4e5760208301516000906020840151909150856001600160a01b0316876001600160a01b0316846001600160a01b03167fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f628585604051610b3f929190918252602082015260400190565b60405180910390a450506106e0565b836001600160a01b0316856001600160a01b0316826001600160a01b03167f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb8686604051610b9d9291906113b5565b60405180910390a45050505050565b6001600160a01b0384163b156103ea5760405163f23a6e6160e01b81526001600160a01b0385169063f23a6e6190610bf090899089908890889088906004016113e3565b6020604051808303816000875af1925050508015610c2b575060408051601f3d908101601f19168201909252610c2891810190611428565b60015b610c94573d808015610c59576040519150601f19603f3d011682016040523d82523d6000602084013e610c5e565b606091505b508051600003610c8c57604051632bfa23e760e11b81526001600160a01b03861660048201526024016103d4565b805181602001fd5b6001600160e01b0319811663f23a6e6160e01b146108d857604051632bfa23e760e11b81526001600160a01b03861660048201526024016103d4565b6001600160a01b0384163b156103ea5760405163bc197c8160e01b81526001600160a01b0385169063bc197c8190610d149089908990889088908890600401611445565b6020604051808303816000875af1925050508015610d4f575060408051601f3d908101601f19168201909252610d4c91810190611428565b60015b610d7d573d808015610c59576040519150601f19603f3d011682016040523d82523d6000602084013e610c5e565b6001600160e01b0319811663bc197c8160e01b146108d857604051632bfa23e760e11b81526001600160a01b03861660048201526024016103d4565b80356001600160a01b0381168114610dd057600080fd5b919050565b60008060408385031215610de857600080fd5b610df183610db9565b946020939093013593505050565b6001600160e01b0319811681146105e057600080fd5b600060208284031215610e2757600080fd5b8135610e3281610dff565b9392505050565b600060208284031215610e4b57600080fd5b5035919050565b6000815180845260005b81811015610e7857602081850181015186830182015201610e5c565b506000602082860101526020601f19601f83011685010191505092915050565b602081526000610e326020830184610e52565b600080600060608486031215610ec057600080fd5b610ec984610db9565b95602085013595506040909401359392505050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff81118282101715610f1d57610f1d610ede565b604052919050565b600067ffffffffffffffff821115610f3f57610f3f610ede565b5060051b60200190565b600082601f830112610f5a57600080fd5b81356020610f6f610f6a83610f25565b610ef4565b8083825260208201915060208460051b870101935086841115610f9157600080fd5b602086015b84811015610fad5780358352918301918301610f96565b509695505050505050565b600082601f830112610fc957600080fd5b813567ffffffffffffffff811115610fe357610fe3610ede565b610ff6601f8201601f1916602001610ef4565b81815284602083860101111561100b57600080fd5b816020850160208301376000918101602001919091529392505050565b600080600080600060a0868803121561104057600080fd5b61104986610db9565b945061105760208701610db9565b9350604086013567ffffffffffffffff8082111561107457600080fd5b61108089838a01610f49565b9450606088013591508082111561109657600080fd5b6110a289838a01610f49565b935060808801359150808211156110b857600080fd5b506110c588828901610fb8565b9150509295509295909350565b600080604083850312156110e557600080fd5b823567ffffffffffffffff808211156110fd57600080fd5b818501915085601f83011261111157600080fd5b81356020611121610f6a83610f25565b82815260059290921b8401810191818101908984111561114057600080fd5b948201945b838610156111655761115686610db9565b82529482019490820190611145565b9650508601359250508082111561117b57600080fd5b5061118885828601610f49565b9150509250929050565b60008151808452602080850194506020840160005b838110156111c3578151875295820195908201906001016111a7565b509495945050505050565b602081526000610e326020830184611192565b6000806000606084860312156111f657600080fd5b6111ff84610db9565b9250602084013567ffffffffffffffff8082111561121c57600080fd5b61122887838801610f49565b9350604086013591508082111561123e57600080fd5b5061124b86828701610f49565b9150509250925092565b6000806040838503121561126857600080fd5b61127183610db9565b91506020830135801515811461128657600080fd5b809150509250929050565b600080604083850312156112a457600080fd5b6112ad83610db9565b91506112bb60208401610db9565b90509250929050565b600080600080600060a086880312156112dc57600080fd5b6112e586610db9565b94506112f360208701610db9565b93506040860135925060608601359150608086013567ffffffffffffffff81111561131d57600080fd5b6110c588828901610fb8565b60006020828403121561133b57600080fd5b610e3282610db9565b600181811c9082168061135857607f821691505b60208210810361137857634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052603260045260246000fd5b8082018082111561027457634e487b7160e01b600052601160045260246000fd5b6040815260006113c86040830185611192565b82810360208401526113da8185611192565b95945050505050565b6001600160a01b03868116825285166020820152604081018490526060810183905260a06080820181905260009061141d90830184610e52565b979650505050505050565b60006020828403121561143a57600080fd5b8151610e3281610dff565b6001600160a01b0386811682528516602082015260a06040820181905260009061147190830186611192565b82810360608401526114838186611192565b905082810360808401526114978185610e52565b9897505050505050505056fea2646970667358221220b2f96f14c0ce85916988e99cfd7c833bd312e20943c4af02b5bcbf29a0610d7364736f6c63430008170033";

type FriendKeyConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: FriendKeyConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class FriendKey__factory extends ContractFactory {
  constructor(...args: FriendKeyConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    uri_: string,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(uri_, overrides || {});
  }
  override deploy(
    uri_: string,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(uri_, overrides || {}) as Promise<
      FriendKey & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): FriendKey__factory {
    return super.connect(runner) as FriendKey__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): FriendKeyInterface {
    return new Interface(_abi) as FriendKeyInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): FriendKey {
    return new Contract(address, _abi, runner) as unknown as FriendKey;
  }
}
