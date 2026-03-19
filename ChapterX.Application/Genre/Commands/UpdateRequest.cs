using MediatR;

namespace ChapterX.Application.Genre.Commands
{
    public record UpdateRequest(int Id, string Name) : IRequest<UpdateResponse>;
}
