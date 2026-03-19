using MediatR;

namespace ChapterX.Application.ReadingList.Commands
{
    public record DeleteRequest(int Id) : IRequest<DeleteResponse>;
}
