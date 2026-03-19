using MediatR;

namespace ChapterX.Application.Chapter.Commands
{
    public record DeleteRequest(int Id) : IRequest<DeleteResponse>;
}
