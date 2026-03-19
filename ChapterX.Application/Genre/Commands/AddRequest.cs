using MediatR;

namespace ChapterX.Application.Genre.Commands
{
    public record AddRequest(string Name) : IRequest<AddResponse>;
}
