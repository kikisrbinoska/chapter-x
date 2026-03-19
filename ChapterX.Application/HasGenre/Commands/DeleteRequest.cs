using MediatR;

namespace ChapterX.Application.HasGenre.Commands
{
    public record DeleteRequest(int Id) : IRequest<DeleteResponse>;
}
